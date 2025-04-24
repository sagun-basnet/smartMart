import { db } from "../db/db.js";

// Get all active orders (Not-deliver)
export const getOrders = (req, res) => {
  const sql = `
    SELECT 
      s.*, 
      s.id as order_id,
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
      s.status = 'Not-deliver'
    GROUP BY 
      s.id;
  `;

  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch orders", details: err });
    res.status(200).json(results);
  });
};

// Get all 'Not-deliver' orders by specific user
export const getOrdersByUser = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT 
      s.*, 
      s.id as order_id,
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
      s.status = 'Not-deliver' AND s.user_id = ?
    GROUP BY 
      s.id;
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch user orders", details: err });
    res.status(200).json(results);
  });
};

// Cancel an order (change status to Cancelled)
export const cancelOrder = (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE sales SET status = 'Cancelled' WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to cancel order", details: err });
    res.status(200).json({ message: "Order cancelled successfully" });
  });
};
// Delivered orders by specific user
export const getDeliveredOrdersByUser = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT 
      s.*, 
      s.id as order_id,
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
        .json({ error: "Failed to fetch delivered orders", details: err });
    res.status(200).json(results);
  });
};
export const updateOrder = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    db.query(
      "UPDATE sales SET tracking = ? WHERE id = ?",
      [status, id],
      (err, result) => {
        if (err) {
          console.error("Error updating order:", err);
          return res.status(500).json({ error: "Database update failed" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Order not found" });
        }
      }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Database update failed" });
  }
};
