import { db } from "../db/db.js";

// Get all completed sales (Delivered)
export const getSales = (req, res) => {
  const sql = `
    SELECT 
      s.*, 
      s.id as sales_id,
      s.quantity as order_quantity,
      u.*,
      p.*,
      GROUP_CONCAT(i.image) AS images
    FROM 
      sales s
    JOIN 
      users u ON s.user_id = u.id
    JOIN 
      product p ON s.product_id = p.pid
    LEFT JOIN 
      image i ON p.pid = i.pid
    WHERE 
      s.status = 'Delivered'
    GROUP BY 
      s.id;
  `;

  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch sales", details: err });
    res.status(200).json(results);
  });
};

// Get sales by specific user (only Delivered)
export const getSalesByUser = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT 
      s.*, 
      s.id as sales_id,
      s.quantity as order_quantity,
      u.*,
      p.*,
      GROUP_CONCAT(i.image) AS images
    FROM 
      sales s
    JOIN 
      users u ON s.user_id = u.id
    JOIN 
      product p ON s.product_id = p.pid
    LEFT JOIN 
      image i ON p.pid = i.pid
    WHERE 
      s.status = 'Delivered' AND s.user_id = ?
    GROUP BY 
      s.id;
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch user sales", details: err });
    res.status(200).json(results);
  });
};

// Mark a sale as Delivered
export const markAsDelivered = (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE sales SET status = 'Delivered' WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to update status", details: err });
    res.status(200).json({ message: "Sale marked as delivered" });
  });
};
