const express = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");
const path = require("path");
const { error } = require("console");
const port = 8080;
app.use(express.urlencoded()); // To get the POST request data, Using 'req.body'

// PUG SPECIFIC STUFFS
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// Function to count the number of files in the directory
function countFilesInDirectory(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files.length);
      }
    });
  });
}
let imageCounter = 0;

// Specify the storage format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.join(
      __dirname,
      `labels/${req.body.Name} ${req.body.Enrollment}`
    );
    // Checking if the file exists or not
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, directory);
    });
  },
  filename: async (req, file, cb) => {
    const directory = path.join(
      __dirname,
      `labels/${req.body.Name} ${req.body.Enrollment}`
    );
    try {
      const fileCount = await countFilesInDirectory(directory);
      if (fileCount < 5) {
        // If less than or equal to 5 files
        imageCounter++;
        const fileName = `${imageCounter}${path.extname(file.originalname)}`;
        cb(null, fileName);
      } else {
        // cb(new Error("Maxixmum Number of files exceeded"), null);
        
      }
    } catch (err) {
      cb(err, null);
    }
  },
});

// Settting the destination directory to save the files
const upload = multer({ storage: storage });

// END points
app.get("/", (req, res) => {
  res.status(200).render("uploadPage");
});

// Handling post requests
app.post("/upload", upload.single("imageupload"), (req, res) => {
  console.log(req.body.Name);
  return res.redirect("/");
});

// Start the server
app.listen(port, () => {
  `The application is started successfully at http://localhost:${port}`;
});
