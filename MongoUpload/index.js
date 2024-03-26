const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");
const { ObjectId } = require("bson");

// MongoDB connection URI
const mongoPass = "4iV9cexpfHXV9UUu";
const mongoURI = `mongodb+srv://vaidkumar31:${mongoPass}@cluster0.dblhkka.mongodb.net/?retryWrites=true&w=majority`;

// Database Name
const dbName = "images";
const name = "vaidik";
const adminId = "202103103510508";

// File path for testing
const filePath = "test2.jpg";

/* Function to read a file as base64 */
function readFileAsBase64(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

/* Function to upload a file to GridFS */

async function uploadFile(db, filePath) {
  const bucket = new GridFSBucket(db);
  const fileData = await readFileAsBase64(filePath);
  console.log(`filePath is: ${filePath}`);
  const uploadStream = bucket.openUploadStream(filePath, {
    metadata: { name, adminId },
  });
  const base64Buffer = Buffer.from(fileData, "base64");
  uploadStream.end(base64Buffer);
  return new Promise((resolve, reject) => {
    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
  });
}

/* Function to download a file from GridFS */
async function downloadFile(dataBase, filename, destination) {
  const bucket = new GridFSBucket(dataBase);
  const query = { filename: filename };
  const file = await bucket.find(query).toArray();
  if (file.length === 0) {
    throw new Error(`File with name ${filename} not found.`);
  }
  const fileId = file[0]._id;
  const downloadStream = bucket.openDownloadStream(fileId);
  const fileStream = fs.createWriteStream(destination);
  return new Promise((resolve, reject) => {
    downloadStream.pipe(fileStream);
    fileStream.on("finish", resolve);
    fileStream.on("error", reject);
  });
}

/* Function to download files from GridFS by admin ID */
async function downloadFilesByAdminId(dataBase, adminId, destinationFolder) {
  const bucket = new GridFSBucket(dataBase);
  const query = { "metadata.adminID": adminId };
  const files = await bucket.find(query).toArray();
  if (files.length === 0) {
    console.log(`No files found for admin ID ${adminId}.`);
    return;
  }
  // Check if the destination folder exists, create it if not
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
    console.log(`Destination folder ${destinationFolder} created.`);
  }
  for (const file of files) {
    const fileId = file._id;
    const filename = `${file.filename}.jpg`;
    const destination = `${destinationFolder}/${filename}`;
    const downloadStream = bucket.openDownloadStream(fileId);
    const fileStream = fs.createWriteStream(destination);
    await new Promise((resolve, reject) => {
      downloadStream.pipe(fileStream);
      fileStream.on("finish", resolve);
      fileStream.on("error", reject);
    });
    console.log(`Downloaded ${filename} successfully.`);
  }
}

// Main function
async function main() {
  let client;
  try {
    client = await MongoClient.connect(mongoURI);
    const dataBase = client.db(dbName);

    /*Upload a file to GridFS */
    // console.log("Uploading file to GridFS...");
    // await uploadFile(dataBase, filePath);
    // console.log("File uploaded successfully.");

    /*  Download the uploaded file from GridFS*/
    // console.log("Downloading file from GridFS...");
    // const filename = "image_1";
    // await downloadFile(dataBase, filename, "downloaded_file.jpg");
    // console.log("File downloaded successfully.");

    /*  Download the all uploaded file from GridFS based on adminId*/
    console.log("Downloading files from GridFS...");
    const adminId = "202103103510508";
    const destinationFolder = "./downloaded_images";
    await downloadFilesByAdminId(dataBase, adminId, destinationFolder);
    console.log("All files downloaded successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

main();
