const connectToDb = require("./db.js");
const express = require("express");
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

// Start the server after connection established to DB
connectToDb().then(() => {
  console.log("Conntected to mongoDb");
});
// import cors
const app = express();
app.use(express.json());
app.use(cors());

// Increase payload size limit to 50mb
// app.use(bodyParser.json({ limit: "200mb" }));
// app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

// Available Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/admin.js");
const imageRoutes = require("./routes/images.js");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth/rootadmin", authRoutes);
app.use("/api/auth", imageRoutes);
// app.use(bodyParser.json({ limit: '200mb' })); // Increase payload size limit to 50mb
// app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

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
