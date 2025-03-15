import { db } from "../db/db.js";

export const addProduct = (req, res) => {
  const { title, description, category, price, discount, quantity } = req.body;

  // Ensure that req.files is defined before accessing it
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }

  const images = req.files; // Get uploaded images
  console.log(images, ": Images");

  // Validate the number of images
  if (images.length < 3 || images.length > 5) {
    return res.status(400).json({
      error: "Please upload between 3 and 5 images.",
    });
  }

  // Insert product into database
  const values = [title, description, category, price, discount, quantity];
  const sql = `INSERT INTO product(title, description, category, price, discount, quantity) VALUES(?,?,?,?,?,?)`;

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error aayo:", err);
      return res
        .status(500)
        .json({ error: "An error occurred", details: err.message });
    }

    const pid = results.insertId;
    console.log("Product has been added, package ID:", pid);

    // Insert images into the database
    const imageValues = images.map((image) => [
      pid,
      `/images/${image.filename}`,
    ]);

    const imageSql = `INSERT INTO image(pid, image) VALUES ?`;

    db.query(imageSql, [imageValues], (imageErr) => {
      if (imageErr) {
        console.error("Error inserting images:", imageErr);
        return res.status(500).json({
          error: "An error occurred while inserting images",
          details: imageErr.message,
        });
      }

      console.log("Images have been added");
      res.status(200).json({
        message: "Product and images have been added successfully",
      });
    });
  });
};

export const getProduct = (req, res) => {
  const sql = `SELECT 
      p.*,
      GROUP_CONCAT(i.image) AS images
  FROM 
      product p
  LEFT JOIN 
      image i ON p.pid = i.pid
  GROUP BY 
      p.pid;`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error aayo:", err);
      return res
        .status(500)
        .json({ error: "An error occurred", details: err.message });
    }

    res.status(200).json(results);
  });
};

export const getProductByCategory = (req, res) => {
  const { category } = req.body;
  console.log(category, ":Category");

  const q = `select * from product where category = '${category}' `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(results);
  });
};
