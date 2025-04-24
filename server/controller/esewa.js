import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import { db } from "../db/db.js";

dotenv.config();

export const verifyEsewa = async (req, res) => {
  const proId = req.params.id;
  console.log(proId, ":proId");

  const uuid = uuidv4();
  const esewaSecret = process.env.ESEWASECRET;
  // console.log(esewaSecret);

  const message = `total_amount=${parseInt(
    proId
  )},transaction_uuid=${uuid},product_code=EPAYTEST`;

  const hash = CryptoJS.HmacSHA256(message, esewaSecret);

  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return res.json({
    uuid: uuid,
    signature: hashInBase64,
    proId: proId,
  });
};

export const handleEsewaSuccess = async (req, res) => {
  const { data } = req.query;

  const encodedItems = req.params.pid; // still named pid in URL
  const qty = req.params.qty; // still named pid in URL
  const uid = req.params.uid;

  const productIds = JSON.parse(
    Buffer.from(encodedItems, "base64").toString("utf-8")
  );
  const quantity = JSON.parse(Buffer.from(qty, "base64").toString("utf-8"));

  let decodedString = atob(data);
  decodedString = JSON.parse(decodedString);

  console.log("Product IDs:", productIds);
  console.log("Product Quantity:", quantity);
  console.log("User ID:", uid);
  console.log("Decoded Amount:", decodedString.total_amount);

  switch (decodedString.status) {
    case "COMPLETE":
      try {
        const message = `total_amount=${decodedString.total_amount},transaction_uuid=${decodedString.transaction_uuid},product_code=${decodedString.product_code}`;
        const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        const result = hashInBase64 == decodedString.signature;
        // if (!result) throw "Hash mismatch";

        let lastInsertedSaleId = null;

        // loop through productIds and insert each
        for (let i = 0; i < productIds.length; i++) {
          const pid = productIds[i];
          const qtyValue = quantity[i];

          // Insert into sales table
          await new Promise((resolve, reject) => {
            const sql =
              "INSERT INTO `sales`(`user_id`, `product_id`, `quantity`) VALUES (?, ?, ?)";
            db.query(
              sql,
              [parseInt(uid), parseInt(pid), parseInt(qtyValue)],
              (err, data) => {
                if (err) {
                  console.error("Error inserting sale:", err);
                  reject(err);
                } else {
                  lastInsertedSaleId = data.insertId;
                  resolve();
                }
              }
            );
          });

          // Deduct stock from product table
          await new Promise((resolve, reject) => {
            const sql =
              "UPDATE product SET quantity = quantity - ? WHERE pid = ?";
            db.query(sql, [parseInt(qtyValue), parseInt(pid)], (err, data) => {
              if (err) {
                console.error("Error updating product stock:", err);
                reject(err);
              } else {
                resolve();
              }
            });
          });
        }

        // Record transaction for last inserted sale ID or handle per item if needed
        await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO transactions(`sales_id`, `amount`) VALUES (?, ?)",
            [lastInsertedSaleId, decodedString.total_amount],
            (err, data) => {
              if (err) {
                console.error("Error inserting transaction:", err);
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });

        const encodedProductIds = Buffer.from(
          JSON.stringify(productIds)
        ).toString("base64");
        res.redirect(
          `http://localhost:5173/finished/${encodeURIComponent(
            encodedProductIds
          )}`
        ); // no single pid now
      } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Payment processing failed." });
      }
      break;

    case "PENDING":
    case "FULL_REFUND":
    case "CANCELED":
      res.redirect("http://localhost:5173/payment-failed");
      break;
  }
};

//fineshed url
//http://localhost:5173/finished/${pid}
