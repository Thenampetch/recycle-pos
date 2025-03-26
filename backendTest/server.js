require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const { SerialPort } = require("serialport");
const WebSocket = require("ws");

const port = 3000;

app.use(cors());
app.use(express.json());

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");
});

// Try to connect to SerialPort, but handle errors
let serialPort;
try {
  serialPort = new SerialPort({
    path: "COM3", // AFTER CONNECTED TO THE SCALE Change this if needed
    baudRate: 9600,
  });

  serialPort.on("data", (data) => {
    const weight = data.toString().trim();
    console.log("Weight:", weight);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(weight);
      }
    });
  });

  serialPort.on("error", (err) => {
    console.error("❌ SerialPort Error:", err.message);
  });
} catch (err) {
  console.error("⚠️ SerialPort initialization failed:", err.message);
}

// Default route
app.get("/", (req, res) => {
  res.send("Server is running! Use the API endpoints.");
});

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI, {
  tls: true, // Enforce TLS
  tlsInsecure: false, // Ensure secure connection
});

async function connectDB() {
  try {
    await client.connect();
    db = client.db();
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

// Middleware to attach DB to requests
app.use((req, res, next) => {
  if (!db) return res.status(500).json({ error: "Database not initialized" });
  req.db = db;
  next();
});

// Routes
app.use("/members", require("./routes/member.routes"));
app.use("/materials", require("./routes/material.routes"));
app.use("/invoices", require("./routes/invoice.routes"));
app.use("/inventory", require("./routes/inventory.routes"));

// Set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { MongoClient } = require("mongodb");

// const app = express();
// const { SerialPort } = require("serialport"); // Use destructuring to import SerialPort
// const WebSocket = require("ws");

// const port = 3000; // Your backend port

// app.use(cors());
// app.use(express.json());

// // WebSocket Server
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Client connected to WebSocket");
// });

// const serialPort = new SerialPort({
//   path: "COM3", // AFTER CONNECTION Change this to match serial port
//   baudRate: 9600,
// });

// serialPort.on("data", (data) => {
//   const weight = data.toString().trim();
//   console.log("Weight:", weight);

//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(weight);
//     }
//   });
// });


// // Default route
// app.get("/", (req, res) => {
//     res.send("Server is running! Use the API endpoints.");
// });

// // MongoDB connection
// const client = new MongoClient(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     tls: true, // Enforce TLS
//     tlsInsecure: false, // Ensure secure connection
//     //tlsAllowInvalidCertificates: true // Ignore SSL certificate issues
// });

// async function connectDB() {
//     try {
//         await client.connect();
//         db = client.db(); // Connect to the default DB in the URI
//         console.log("✅ MongoDB connected successfully!");
//     } catch (err) {
//         console.error("❌ MongoDB connection error:", err);
//         process.exit(1);
//     }
// }

// connectDB();

// // Middleware to attach DB to requests
// app.use((req, res, next) => {
//     if (!db) return res.status(500).json({ error: "Database not initialized" });
//     req.db = db;
//     next();
// });

// // Routes
// app.use("/members", require("./routes/member.routes"));
// app.use("/materials", require("./routes/material.routes"));
// app.use("/invoices", require("./routes/invoice.routes"));
// app.use("/inventory", require("./routes/inventory.routes"));

// // Set port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
