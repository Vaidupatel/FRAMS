// Import mongoose
const { connect, connection } = require("mongoose");
const mongoPass = "4iV9cexpfHXV9UUu";
const mongoURI = `mongodb+srv://vaidkumar31:${mongoPass}@cluster0.dblhkka.mongodb.net/?retryWrites=true&w=majority`;
let dbConnection = null;

const connectToDb = async () => {
  try {
    if (!dbConnection) {
      await connect(mongoURI);
      // console.log("Connected to MongoDB");
      dbConnection = connection;
    }
    return dbConnection; // Return the connection object
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to be caught in the calling code
  }
};

// export default connectToDb;
module.exports = connectToDb;
