require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const http = require("http");

// Create an HTTP server to attach socket.io
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Store user socketId mapping
const userSocketMap = new Map();

app.use(bodyParser.json({ limit: "500mb" }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

const PatientRoutes = require("./routes/v1/patients.route");
// Routers
app.use("/api/v1/patients/", PatientRoutes);

// Start the server with Socket.IO
server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
