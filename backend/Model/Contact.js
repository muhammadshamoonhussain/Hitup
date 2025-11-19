const mongoose = require("mongoose");
const {Schema} = mongoose;

const ContactSchema = new Schema({
    firstname: { type: String, required: true },
  lastname: { type: String, required: true, },
  email: { type: String, required: true, },
  disscus: { type: String, required: true, },
  comment: { type: String, required: true, },

}, { timestamps: true })

const Contact_model = mongoose.model("Contact",ContactSchema);
module.exports = Contact_model;
