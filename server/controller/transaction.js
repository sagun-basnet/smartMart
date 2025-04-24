import { db } from "../db/db.js";

// Get all transactions
export const getAllTransactions = (req, res) => {
  const sql = `
    SELECT 
      t.*, 
      t.id as transaction_id,
      t.status as transaction_status,
      s.user_id,
      s.id as sales_id,
      s.*,
      p.title,
      u.name
    FROM 
      transactions t
    JOIN 
      sales s ON t.sales_id = s.id
    JOIN 
      product p ON s.product_id = p.pid
    JOIN 
      users u ON s.user_id = u.id
    ORDER BY 
      t.payment_date DESC;
  `;

  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch transactions", details: err });
    res.status(200).json(results);
  });
};

// Get total transaction amount
export const getTotalTransactionAmount = (req, res) => {
  const sql = `
      SELECT SUM(CAST(REPLACE(amount, ',', '') AS DECIMAL(15,2))) AS total_amount
      FROM transactions
    `;

  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to calculate total", details: err });
    res.status(200).json({ total_amount: results[0].total_amount || 0 });
  });
};

// Get transactions by user
export const getTransactionsByUser = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT 
      t.*, 
      s.user_id,
      p.title,
      u.username
    FROM 
      transactions t
    JOIN 
      sales s ON t.sales_id = s.id
    JOIN 
      product p ON s.product_id = p.pid
    JOIN 
      users u ON s.user_id = u.id
    WHERE 
      s.user_id = ?
    ORDER BY 
      t.payment_date DESC;
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Failed to fetch user transactions", details: err });
    res.status(200).json(results);
  });
};
