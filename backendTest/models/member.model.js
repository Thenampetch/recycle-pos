const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    memberID: { type: String, required: true },
    memberName: { type: String, required: true },
    memberNameTH: { type: String, required: true },
    refNum: { type: String, required: true }
}, { collection: 'members' });  // Explicitly setting collection name to 'members'

module.exports = mongoose.model("Member", MemberSchema);
