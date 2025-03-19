import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";
import { db } from "../db/db.js";

dotenv.config();

export const verifyEsewa = async (req, res) => {
  const proId = req.params.id;
  const uuid = uuidv4();
  const esewaSecret = process.env.ESEWASECRET;
  // console.log(esewaSecret);

  await axios
    .get(`http://localhost:5555/api/get-products-by-id/${proId}`)
    .then((response) => {
      // console.log(response.data, " : Esewa controller response data");
      const productData = response.data;
      console.log(productData, " :Product");

      const discountedPrice = (
        productData[0].price *
        (1 - productData[0]?.discount / 100)
      ).toFixed(2);
      console.log(discountedPrice, " : Discounted");
      const message = `total_amount=${parseInt(
        discountedPrice
      )},transaction_uuid=${uuid},product_code=EPAYTEST`;

      const hash = CryptoJS.HmacSHA256(message, esewaSecret);

      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      return res.json({
        uuid: uuid,
        signature: hashInBase64,
        proId: proId,
      });
    })
    .catch((err) => {
      console.error("Error in getting seller details", err);
    });
};

export const handleEsewaSuccess = async (req, res) => {
  const { data } = req.query;
  const pid = req.params.pid;
  const uid = req.params.uid;

  console.log(pid, ":pid");
  console.log(uid, ":uid");

  let decodedString = atob(data);
  decodedString = JSON.parse(decodedString);
  console.log(decodedString.total_amount, ":price");

  switch (decodedString.status) {
    // compare the signature once again for better security
    case "COMPLETE":
      try {
        const message = `total_amount=${decodedString.total_amount},transaction_uuid=${decodedString.transaction_uuid},product_code=${decodedString.product_code}`;

        const hash = CryptoJS.HmacSHA256(message, process.env.ESEWASECRET);
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        const result = hashInBase64 == decodedString.signature;
        // if (result == false) {
        //   throw "Hash value not matched";
        // }
        const sql = "INSERT into `sales`(`user_id`, `product_id`) value(?,?)";
        db.query(sql, [parseInt(uid), parseInt(pid)], (err, data) => {
          if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).json({ error: "Failed to create booking." });
          }
          console.log(data.insertId, ":Result");
          db.query(
            "insert into transactions(`sales_id`, `amount`) values(?,?)",
            [data.insertId, decodedString.total_amount],
            (err, data) => {
              if (err) {
                console.error("Error inserting order:", err);
                return res
                  .status(500)
                  .json({ error: "Failed to create Transaction." });
              }
            }
          );
          // After successfully inserting the order, send the redirect response
          res.redirect(`http://localhost:5173/finished/${pid}`);
        });
      } catch (error) {
        console.log("error occoured", error);
      }
      break;

    case "PENDING":
      break;

    case "FULL_REFUND":
      break;

    case "CANCELED":
      break;
  }
};

//fineshed url
//http://localhost:5173/finished/${pid}
