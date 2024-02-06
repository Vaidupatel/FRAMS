const mongoose=require( "mongoose");

const { Schema } = mongoose;
const rootAdminSchema = new Schema({
  name: {
    type: String,
  },

  rootAdminId: {
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

const RootAdmin = mongoose.model("rootAdmin", rootAdminSchema);
module.exports = RootAdmin;
// export default RootAdmin;