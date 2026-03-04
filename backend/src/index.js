const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from my .env file (Not the sample file)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allows frontend to talk to backend
app.use(express.json({ limit: "10mb" }));           // parses incoming JSON, 10mb for images

// Health check route (used to confirm the server is running)
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Welcome! AcessibleDocs is running." });
});

// Routes will be added here later once i decide on my OCR
// app.use("/api", translateRoute);

// Starting the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});