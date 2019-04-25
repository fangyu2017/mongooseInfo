const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  type: {
    type: String
  },
  desc: {
    type: String
  },
  incode: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
