const connectToDb =require( "./db.js");
const express = require( "express");
const port = 5000;
const cors = require("cors");

// Start the server after connection established to DB
connectToDb().then(() => {
  console.log("Conntected to mongoDb");
});
// import cors
const app = express();
app.use(express.json()); 
app.use(cors());

// Available Routes
const authRoutes =require( "./routes/auth.js");
const userRoutes =require("./routes/admin.js");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth/rootadmin", authRoutes);

app.listen(port, () => {
  console.log(`FRAM Server listening on http://localhost:${port}`);
});
// Endpoints
app.get("/", (req, res) => {
  try {
    res.send("Server is running successfully");
  } catch (error) {
    console.log("Error in / ", error.message);
  }
});
