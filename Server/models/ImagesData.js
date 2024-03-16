const mongoose = require("mongoose");
const { Schema } = mongoose;
const ImageSchema = new Schema({
  userName: {
    type: "string",
    required: true,
  },
  userID: {
    type: Number,
    length: 15,
    required: true,
  },
  userDesig: {
    type: "string",
    required: true,
  },
  userLabel: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  image4: {
    type: String,
    required: true,
  },
  image5: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Image = mongoose.model("image", ImageSchema);
module.exports = Image;
// export default Admin;
