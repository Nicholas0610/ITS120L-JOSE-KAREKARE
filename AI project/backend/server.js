import cors from "cors";
import express from "express";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite
const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

// 🧠 ROUTES ===========================

// ✅ 1. Get all menu items
app.get("/api/menu", async (req, res) => {
  try {
    const db = await dbPromise;
    const menu = await db.all("SELECT * FROM MenuItem;");
    res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ 2. Get all users
app.get("/api/users", async (req, res) => {
  try {
    const db = await dbPromise;
    const users = await db.all("SELECT * FROM User;");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ 3. Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const db = await dbPromise;
    const orders = await db.all("SELECT * FROM [Order];");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ====================================

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
