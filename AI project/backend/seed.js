import { open } from "sqlite";
import sqlite3 from "sqlite3";

const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

async function seed() {
  const db = await dbPromise;

  // 🧩 Check if users already exist
  const userCount = await db.get(`SELECT COUNT(*) as count FROM User`);
  if (userCount.count === 0) {
    await db.run(`
      INSERT INTO User (Name, Email, Password, Contact, Address, UserType)
      VALUES
        ('Jose Dela Cruz', 'jose@example.com', 'hashedpassword1', '09171234567', 'Manila, Philippines', 'Customer'),
        ('Admin User', 'admin@example.com', 'hashedpassword2', '09987654321', 'Quezon City', 'Admin');
    `);
    console.log("✅ Inserted sample users");
  } else {
    console.log("⚠️ Users already exist, skipping...");
  }

  // 🧩 Check if menu items exist
  const menuCount = await db.get(`SELECT COUNT(*) as count FROM MenuItem`);
  if (menuCount.count === 0) {
    await db.run(`
      INSERT INTO MenuItem (Item_Name, Description, Category, Price)
      VALUES
        ('Kare-Kare', 'Traditional Filipino peanut stew', 'Main Dish', 250.00),
        ('Bulalo', 'Beef marrow soup', 'Main Dish', 300.00),
        ('Leche Flan', 'Sweet custard dessert', 'Dessert', 80.00);
    `);
    console.log("✅ Inserted menu items");
  } else {
    console.log("⚠️ Menu items already exist, skipping...");
  }

  // 🧩 Check if orders exist
  const orderCount = await db.get(`SELECT COUNT(*) as count FROM [Order]`);
  if (orderCount.count === 0) {
    await db.run(`
      INSERT INTO [Order] (User_ID, Total_Amount, Order_Status)
      VALUES
        (1, 550.00, 'Delivered'),
        (1, 250.00, 'Preparing');
    `);
    console.log("✅ Inserted sample orders");
  } else {
    console.log("⚠️ Orders already exist, skipping...");
  }

  // 🧩 Check if order details exist
  const orderDetailsCount = await db.get(`SELECT COUNT(*) as count FROM OrderDetails`);
  if (orderDetailsCount.count === 0) {
    await db.run(`
      INSERT INTO OrderDetails (Order_ID, Item_ID, Quantity, Subtotal)
      VALUES
        (1, 1, 1, 250.00),
        (1, 3, 1, 80.00),
        (2, 2, 1, 300.00);
    `);
    console.log("✅ Inserted order details");
  } else {
    console.log("⚠️ Order details already exist, skipping...");
  }

  console.log("\n🎉 Database seeding complete!");
}

seed().catch((err) => console.error("❌ Error seeding database:", err));
