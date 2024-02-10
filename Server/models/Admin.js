const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  adminID: {
    type: Number,
    length: 15,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  mobile: {
    type: Number,
    length: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;
// export default Admin;
