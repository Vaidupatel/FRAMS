const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminSchema = new Schema({
  name: {
    type: String,
  },
  adminID: {
    type: Number,
    length: 15,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
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
