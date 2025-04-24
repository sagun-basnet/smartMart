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
  const values = [
    title,
    description,
    category,
    parseInt(price),
    discount,
    quantity,
  ];
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
  const { category } = req.query;
  console.log(category, ":Category");

  const q = `SELECT 
      p.*,
      GROUP_CONCAT(i.image) AS images
  FROM 
      product p
  LEFT JOIN 
      image i ON p.pid = i.pid where category = '${category}'
  GROUP BY 
      p.pid;  `;
  db.query(q, (err, results) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(results);
  });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const q = `SELECT 
      p.*,
      GROUP_CONCAT(i.image) AS images
  FROM 
      product p
  LEFT JOIN 
      image i ON p.pid = i.pid where p.pid=?
  GROUP BY 
      p.pid;  `;
  db.query(q, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(results);
  });
};

export const getProductByIds = (req, res) => {
  const ids = req.body.ids;
  console.log(ids, ":IDs");

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid product ID list" });
  }

  const placeholders = ids.map(() => "?").join(",");
  const sql = `
    SELECT 
      p.*, 
      GROUP_CONCAT(i.image) AS images
    FROM 
      product p
    LEFT JOIN 
      image i ON p.pid = i.pid
    WHERE 
      p.pid IN (${placeholders})
    GROUP BY 
      p.pid;
  `;

  db.query(sql, ids, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }

    res.json(results);
  });
};

export const editProduct = (req, res) => {
  const { id } = req.params;
  const { title, description, category, price, discount, quantity } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  // Update product details in the database
  const updateSql = `UPDATE product SET title=?, description=?, category=?, price=?, discount=?, quantity=? WHERE pid=?`;
  const values = [title, description, category, price, discount, quantity, id];

  db.query(updateSql, values, (err, results) => {
    if (err) {
      console.error("Error updating product:", err);
      return res
        .status(500)
        .json({ error: "An error occurred", details: err.message });
    }

    // If images are uploaded, update them
    if (req.files && req.files.length > 0) {
      // Delete existing images
      const deleteImageSql = `DELETE FROM image WHERE pid=?`;
      db.query(deleteImageSql, [id], (deleteErr) => {
        if (deleteErr) {
          console.error("Error deleting old images:", deleteErr);
          return res.status(500).json({
            error: "An error occurred while deleting old images",
            details: deleteErr.message,
          });
        }

        // Insert new images
        const images = req.files.map((image) => [
          id,
          `/images/${image.filename}`,
        ]);
        const insertImageSql = `INSERT INTO image (pid, image) VALUES ?`;
        db.query(insertImageSql, [images], (insertErr) => {
          if (insertErr) {
            console.error("Error inserting images:", insertErr);
            return res.status(500).json({
              error: "An error occurred while inserting images",
              details: insertErr.message,
            });
          }

          res.status(200).json({ message: "Product updated successfully" });
        });
      });
    } else {
      res.status(200).json({ message: "Product updated successfully" });
    }
  });
};
export const deletePost = (req, res) => {
  const { id } = req.params;
  console.log(id, ":id");

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  // First, delete associated images
  const deleteImagesQuery = `DELETE FROM image WHERE pid = ?`;

  db.query(deleteImagesQuery, [id], (err) => {
    if (err) {
      console.error("Error deleting images:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting images" });
    }

    // Now, delete the product
    const deleteProductQuery = `DELETE FROM product WHERE pid = ?`;

    db.query(deleteProductQuery, [id], (err) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while deleting product" });
      }

      res
        .status(200)
        .json({ message: "Product deleted successfully", status: true });
    });
  });
};
