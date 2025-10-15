import { open } from "sqlite";
import sqlite3 from "sqlite3";

const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

async function init() {
  const db = await dbPromise;

  // Enable foreign keys
  await db.exec("PRAGMA foreign_keys = ON;");

  // Drop tables if they already exist (optional, for resetting)
  await db.exec(`
    DROP TABLE IF EXISTS ComplaintFeedback;
    DROP TABLE IF EXISTS Delivery;
    DROP TABLE IF EXISTS Payment;
    DROP TABLE IF EXISTS PromoIncentive;
    DROP TABLE IF EXISTS OrderDetails;
    DROP TABLE IF EXISTS [Order];
    DROP TABLE IF EXISTS Inventory;
    DROP TABLE IF EXISTS MenuItem;
    DROP TABLE IF EXISTS Menu;
    DROP TABLE IF EXISTS Admin;
    DROP TABLE IF EXISTS User;
  `);

  // Create tables
  await db.exec(`
    CREATE TABLE User (
      User_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Email TEXT UNIQUE NOT NULL,
      Password TEXT NOT NULL,
      Contact TEXT,
      Address TEXT,
      UserType TEXT CHECK(UserType IN ('Customer', 'Admin')),
      Date_Registered TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE Admin (
      Admin_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Name TEXT NOT NULL,
      Email TEXT UNIQUE NOT NULL,
      Password TEXT NOT NULL,
      Role TEXT
    );

    CREATE TABLE Menu (
      Item_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Item_Name TEXT NOT NULL,
      Description TEXT,
      Price REAL NOT NULL,
      Category TEXT,
      Availability INTEGER DEFAULT 1
    );

    CREATE TABLE MenuItem (
      ItemID INTEGER PRIMARY KEY AUTOINCREMENT,
      Item_Name TEXT,
      Description TEXT,
      Category TEXT,
      Price REAL,
      Availability INTEGER DEFAULT 1
    );

    CREATE TABLE Inventory (
      Inventory_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      ItemName TEXT,
      Quantity INTEGER,
      Unit TEXT,
      LastUpdate TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (ItemName) REFERENCES MenuItem(Item_Name)
    );

    CREATE TABLE [Order] (
      OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
      User_ID INTEGER,
      Order_Date TEXT DEFAULT CURRENT_TIMESTAMP,
      Total_Amount REAL,
      Order_Status TEXT CHECK(Order_Status IN ('Pending', 'Preparing', 'Delivering', 'Delivered')),
      FOREIGN KEY (User_ID) REFERENCES User(User_ID)
    );

    CREATE TABLE OrderDetails (
      OrderDetail_ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Order_ID INTEGER,
      Item_ID INTEGER,
      Quantity INTEGER,
      Subtotal REAL,
      FOREIGN KEY (Order_ID) REFERENCES [Order](OrderID),
      FOREIGN KEY (Item_ID) REFERENCES MenuItem(ItemID)
    );

    CREATE TABLE Payment (
      PaymentID INTEGER PRIMARY KEY AUTOINCREMENT,
      Order_ID INTEGER,
      Payment_Method TEXT,
      Transaction_Date TEXT DEFAULT CURRENT_TIMESTAMP,
      Payment_Status TEXT CHECK(Payment_Status IN ('Paid', 'Pending', 'Failed')),
      FOREIGN KEY (Order_ID) REFERENCES [Order](OrderID)
    );

    CREATE TABLE Delivery (
      DeliveryID INTEGER PRIMARY KEY AUTOINCREMENT,
      Order_ID INTEGER,
      DeliveryStaffID INTEGER,
      DeliveryAddress TEXT,
      Delivery_Status TEXT CHECK(Delivery_Status IN ('Out for Delivery', 'Delivered', 'Returned')),
      EstimatedTime TEXT,
      FOREIGN KEY (Order_ID) REFERENCES [Order](OrderID)
    );

    CREATE TABLE PromoIncentive (
      PromoID INTEGER PRIMARY KEY AUTOINCREMENT,
      Promo_Type TEXT,
      Description TEXT,
      Start_Date TEXT,
      End_Date TEXT,
      Eligibility TEXT
    );

    CREATE TABLE ComplaintFeedback (
      TicketNum INTEGER PRIMARY KEY AUTOINCREMENT,
      User_ID INTEGER,
      OrderID INTEGER,
      Description TEXT,
      Status TEXT CHECK(Status IN ('Open', 'In Progress', 'Resolved')),
      Date_Submitted TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (User_ID) REFERENCES User(User_ID),
      FOREIGN KEY (OrderID) REFERENCES [Order](OrderID)
    );
  `);

  console.log("✅ Database initialized with all ERD tables!");
}

init();
