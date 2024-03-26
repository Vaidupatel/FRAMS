const mongoose = require("mongoose");
const { Schema } = mongoose;
const ImageSchema = new Schema({
  adminID: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return String(v).length === 15 && !isNaN(v);
      },
      message: (props) => `${props.value} is not a valid admin ID`,
    },
  },
  designation: {
    type: String,
    required: true,
  },
  imageID: {
    type: Number,
    required: true,
  },
  imageData: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 5 && v.every((image) => typeof image === "string");
      },
      message: (props) => `Image data array is invalid`,
    },
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
