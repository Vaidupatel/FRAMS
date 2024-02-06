// Import mongoose
const { connect, connection } = require("mongoose");
const mongoPass = "biGox4cOnP10LQ83";
const mongoURI = `mongodb+srv://vaidkumar31:${mongoPass}@cluster0.dblhkka.mongodb.net/?retryWrites=true&w=majority`;

const connectToDb= async() =>{
 await connect(mongoURI);
}
//   Handle the errors during connetion to DB
connection.on("error", (err) => {
  console.log("MongoDb connection error: " + err);
});

// export default connectToDb;
module.exports = connectToDb;
