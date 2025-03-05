import { db } from "../db/db.js";

export const addProduct = (req, res) => {
  const { title, description, category, price, discount, quantity } = req.body;
  const images = req.files;
  console.log(images,':Images');
  
  // Validate the number of images
  if (!images || images.length < 3 || images.length > 5) {
    return res.status(400).json({
      error: "Please upload between 3 and 5 images.",
    });
  }

  // Values for package table insertion
  const values = [title, description, category, price, discount, quantity];
  const sql = `INSERT INTO product(title, description, category, price, discount, quantity) VALUES(?,?,?,?,?,?)`;

  // Insert package into the package table
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error aayo:", err);
      return res
        .status(500)
        .json({ error: "An error occurred", details: err.message });
    }

    const pid = results.insertId; // Get the ID of the inserted package
    console.log("Product has been added, package ID:", pid);

    // Insert images into the package_images table
    const imageValues = images
      .slice(0, 3) // Ensure only 3 images are inserted
      .map((image) => [pid, `/images/${image.filename}`]);

    // Insert each image as a separate row
    const imageSql = `INSERT INTO image(pid, image) VALUES ?`;

    db.query(imageSql, [imageValues], (imageErr, imageResults) => {
      if (imageErr) {
        console.error("Error inserting images:", imageErr);
        return res.status(500).json({
          error: "An error occurred while inserting images",
          details: imageErr.message,
        });
      }

      console.log("Images have been added");
      res.status(200).json({
        message: "package and images have been added successfully",
        imageResults,
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