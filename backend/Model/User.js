const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
  lastname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, },
  role: {
    type: String,
    enum: ["admin","user"],
    default: ""
  },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  email: { type: String, required: true, unique: true },

}, { timestamps: true })

const User = mongoose.model("User",UserSchema);
module.exports = User;
