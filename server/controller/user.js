import { db } from "../db/db.js";
import bcrypt from "bcryptjs";

// Get all users
export const getAllUsers = (req, res) => {
  const q =
    "SELECT id, name, email, phone, address, role_id, created_at FROM users";
  db.query(q, (err, data) => {
    if (err)
      return res.status(500).json({ error: "Error fetching users", err });
    res.status(200).json(data);
  });
};

// Get user by ID
export const getUserById = (req, res) => {
  const q =
    "SELECT id, name, email, phone, address, role_id, created_at FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ error: "Error fetching user", err });
    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(data[0]);
  });
};

// Update user by ID
export const updateUser = (req, res) => {
  const { name, email, phone, address, role_id } = req.body;
  const q = `
    UPDATE users 
    SET name = ?, email = ?, phone = ?, address = ?, role_id = ?
    WHERE id = ?
  `;
  db.query(
    q,
    [name, email, phone, address, role_id, req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json({ error: "Error updating user", err });
      res.status(200).json({ message: "User updated successfully", result });
    }
  );
};

// Delete user by ID
export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id = ?";
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error deleting user", err });
    res.status(200).json({ message: "User deleted successfully", result });
  });
};

// Update password (Optional Secure Password Update)
export const updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.params.id;

  const checkQuery = "SELECT password FROM users WHERE id = ?";
  db.query(checkQuery, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const passwordMatch = bcrypt.compareSync(oldPassword, data[0].password);
    if (!passwordMatch)
      return res.status(400).json("Old password is incorrect");

    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
    db.query(updateQuery, [hashedNewPassword, userId], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: "Password updated successfully" });
    });
  });
};
