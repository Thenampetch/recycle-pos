const Member = require("../models/member.model");

// // Create new member
// exports.createMember = async (req, res) => {
//     try {
//         const newMember = new Member(req.body);
//         await newMember.save();
//         res.status(201).json(newMember);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get all members
// exports.getAllMembers = async (req, res) => {
//     try {
//         console.log("Fetching members from database..."); // Debug log
//         const members = await Member.find();
//         console.log("Members fetched:", members); // Debug log
//         res.json(members);
//     } catch (err) {
//         console.error("❌ Error fetching members:", err);
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get member by ID
// exports.getMemberById = async (req, res) => {
//     try {
//         const member = await Member.findOne({ memberID: req.params.memberID }); // Find by memberID
//         if (!member) return res.status(404).json({ error: "Member not found" });
//         res.json(member);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update member by ID
// exports.updateMember = async (req, res) => {
//     try {
//         const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedMember);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Delete member by ID
// exports.deleteMember = async (req, res) => {
//     try {
//         await Member.findByIdAndDelete(req.params.id);
//         res.json({ message: "Member deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// Create new member
exports.createMember = async (req, res) => {
    try {
        const db = req.db;
        const newMember = req.body;

        // Ensure memberID is unique
        const existingMember = await db.collection("members").findOne({ memberID: newMember.memberID });
        if (existingMember) return res.status(400).json({ error: "MemberID already exists" });

        const result = await db.collection("members").insertOne(newMember);
        res.status(201).json({ message: "Member created", member: newMember });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all members
exports.getAllMembers = async (req, res) => {
    try {
        const db = req.db;
        const members = await db.collection("members").find().toArray();
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get member by memberID
exports.getMemberById = async (req, res) => {
    try {
        const db = req.db;
        const member = await db.collection("members").findOne({ memberID: req.params.memberID });

        if (!member) return res.status(404).json({ error: "Member not found" });
        res.json(member);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update member by memberID
exports.updateMember = async (req, res) => {
    try {
        const db = req.db;
        const updatedMember = req.body;

        const result = await db.collection("members").updateOne(
            { memberID: req.params.memberID },
            { $set: updatedMember }
        );

        if (result.matchedCount === 0) return res.status(404).json({ error: "Member not found" });

        res.json({ message: "Member updated", updatedMember });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete member by memberID
exports.deleteMember = async (req, res) => {
    try {
        const db = req.db;

        const result = await db.collection("members").deleteOne({ memberID: req.params.memberID });

        if (result.deletedCount === 0) return res.status(404).json({ error: "Member not found" });

        res.json({ message: "Member deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
