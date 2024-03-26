const { Router } = require("express");
const router = Router();
const { body, validationResult } = require("express-validator");
const { MongoClient, GridFSBucket } = require("mongodb");
const mongoPass = "4iV9cexpfHXV9UUu";
const mongoURI = `mongodb+srv://vaidkumar31:${mongoPass}@cluster0.dblhkka.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "images";

async function uploadFile(dataBase, adminID, designation, imageID, imageData) {
  const bucket = new GridFSBucket(dataBase);
  const uploadStream = bucket.openUploadStream(imageID, {
    metadata: { adminID, designation },
  });
  const base64Buffer = Buffer.from(imageData, "base64");
  uploadStream.end(base64Buffer);
  return new Promise((resolve, reject) => {
    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
  });
}
// ROUTE 1: Store the Base64 : POST "/api/auth/storeimages". No login required
const imageDataState = {};
const mergedImage = {};

router.post(
  "/storeimages",
  [
    body("adminID")
      .isLength({ min: 15, max: 15 })
      .withMessage("Admin ID must be 15 characters long")
      .isNumeric()
      .withMessage("Admin ID must be a number"),
    body("designation")
      .isString()
      .withMessage("Designation must be a string")
      .notEmpty()
      .withMessage("Designation is required"),
    body("imageID")
      .isString()
      .withMessage("Image ID must be a string")
      .notEmpty()
      .withMessage("Image ID is required"),
    body("totalChunks")
      .isNumeric()
      .withMessage("Total Chunk must be a numeric")
      .notEmpty()
      .withMessage("Total Chunk is required"),
    body("chunkID")
      .isNumeric()
      .withMessage("Chunk ID must be a string")
      .notEmpty()
      .withMessage("Chunk ID is required"),
    body("imageData")
      .isString()
      .withMessage("Image data must be a string")
      .notEmpty()
      .withMessage("Image data is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { adminID, designation, imageID, totalChunks, chunkID, imageData } =
        req.body;

      // chaeck if image ID is present in imageDataState or not
      if (!imageDataState[imageID]) {
        imageDataState[imageID] = [];
      }

      // insert image data into imageDataState
      imageDataState[imageID].push({ chunkID, imageData });
      // if all chunks are received then merge them
      if (imageDataState[imageID].length === totalChunks) {
        for (const [imageID, chunks] of Object.entries(imageDataState)) {
          const sortedChunks = chunks.sort((a, b) => a.chunkID - b.chunkID);
          const mergedImageData = sortedChunks
            .map((chunk) => chunk.imageData)
            .join("");
          let client;
          try {
            client = await MongoClient.connect(mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            const dataBase = client.db(dbName);
            console.log("Uploading...");
            await uploadFile(
              dataBase,
              adminID,
              designation,
              imageID,
              mergedImageData
            );
            console.log("File uploaded!");
          } catch (error) {
            console.log("Error:", err);
          } finally {
            if (client) {
              await client.close();
            }
          }
        }
      }

      res.json({ success: true, mergedImage });
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
