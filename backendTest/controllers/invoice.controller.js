exports.createInvoice = async (req, res) => {
    try {
        const db = req.db;
        const { memberID, items, date } = req.body;

        // Fetch member details
        const member = await db.collection("members").findOne({ memberID });

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        // Generate a new invoice ID
        const lastInvoice = await db.collection("invoices").find().sort({ invoiceID: -1 }).limit(1).toArray();
        const newInvoiceID = lastInvoice.length > 0 ? String(Number(lastInvoice[0].invoiceID) + 1).padStart(4, "0") : "0001";

        const newInvoice = {
            invoiceID: newInvoiceID,
            memberID: member.memberID,
            memberName: member.memberName,
            items: items.map(item => ({ ...item, imageUrl: item.imageUrl || null })), // Include image URLs
            date: date || new Date(),
            status: "pending",
            checktime: null,
        };

        await db.collection("invoices").insertOne(newInvoice);
        res.status(201).json({ message: "Invoice created", invoice: newInvoice });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all invoices with member details
exports.getAllInvoices = async (req, res) => {
    try {
        const db = req.db;

        const invoices = await db.collection("invoices").aggregate([
            {
                $lookup: {
                    from: "members",
                    localField: "memberID",
                    foreignField: "memberID",
                    as: "memberDetails"
                }
            },
            { $unwind: { path: "$memberDetails", preserveNullAndEmptyArrays: true } }
        ]).toArray();

        res.json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update invoice by invoiceID
exports.updateInvoice = async (req, res) => {
    try {
        const db = req.db;
        const invoiceID = req.params.invoiceID;
        const { memberID, items, date, status, checktime } = req.body;

        // Fetch updated member details
        const member = await db.collection("members").findOne({ memberID });

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        const updatedInvoice = {
            memberID: member.memberID,
            memberName: member.memberName,
            items: items.map(item => ({ ...item, imageUrl: item.imageUrl || null })), // Include image URLs
            date: date || new Date(),
            status,
            checktime: new Date(),
        };

        const result = await db.collection("invoices").updateOne(
            { invoiceID },
            { $set: updatedInvoice }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }

        res.json({ message: "Invoice updated", updatedInvoice });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Image upload route
exports.uploadImages = async (req, res) => {
    try {
        const invoiceID = req.params.invoiceID;
        const images = req.files.map(file => ({ imageUrl: `http://localhost:3000/uploads/${file.filename}` }));

        // Update the invoice with the image URLs
        await db.collection("invoices").updateOne(
            { invoiceID },
            { $set: { items: images } }
        );

        res.status(200).json({ message: "Images uploaded successfully", images });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// exports.createInvoice = async (req, res) => {
//     try {
//         const db = req.db;
//         const { memberID, items, date } = req.body;

//         // Fetch member details
//         const member = await db.collection("members").findOne({ memberID });

//         if (!member) {
//             return res.status(404).json({ error: "Member not found" });
//         }

//         // Generate a new invoice ID (simple logic, you can adjust as needed)
//         const lastInvoice = await db.collection("invoices").find().sort({ invoiceID: -1 }).limit(1).toArray();
//         const newInvoiceID = lastInvoice.length > 0 ? String(Number(lastInvoice[0].invoiceID) + 1).padStart(4, "0") : "0001";

//         const newInvoice = {
//             invoiceID: newInvoiceID,
//             memberID: member.memberID,
//             memberName: member.memberName,
//             items,
//             date: date || new Date()
//         };

//         await db.collection("invoices").insertOne(newInvoice);

//         res.status(201).json({ message: "Invoice created", invoice: newInvoice });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get all invoices with member details
// exports.getAllInvoices = async (req, res) => {
//     try {
//         const db = req.db;

//         const invoices = await db.collection("invoices").aggregate([
//             {
//                 $lookup: {
//                     from: "members",
//                     localField: "memberID",
//                     foreignField: "memberID",
//                     as: "memberDetails"
//                 }
//             },
//             { $unwind: { path: "$memberDetails", preserveNullAndEmptyArrays: true } }
//         ]).toArray();

//         res.json(invoices);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get invoice by invoiceID with member details
// exports.getInvoiceById = async (req, res) => {
//     try {
//         const db = req.db;
//         const invoiceID = req.params.invoiceID;

//         const invoice = await db.collection("invoices").aggregate([
//             { $match: { invoiceID } },
//             {
//                 $lookup: {
//                     from: "members",
//                     localField: "memberID",
//                     foreignField: "memberID",
//                     as: "memberDetails"
//                 }
//             },
//             { $unwind: { path: "$memberDetails", preserveNullAndEmptyArrays: true } }
//         ]).toArray();

//         if (!invoice.length) {
//             return res.status(404).json({ error: "Invoice not found" });
//         }

//         res.json(invoice[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update invoice by invoiceID
// exports.updateInvoice = async (req, res) => {
//     try {
//         const db = req.db;
//         const invoiceID = req.params.invoiceID;
//         const { memberID, items, date } = req.body;

//         // Fetch updated member details
//         const member = await db.collection("members").findOne({ memberID });

//         if (!member) {
//             return res.status(404).json({ error: "Member not found" });
//         }

//         const updatedInvoice = {
//             memberID: member.memberID,
//             memberName: member.memberName,
//             items,
//             date: date || new Date()
//         };

//         const result = await db.collection("invoices").updateOne(
//             { invoiceID },
//             { $set: updatedInvoice }
//         );

//         if (result.matchedCount === 0) {
//             return res.status(404).json({ error: "Invoice not found" });
//         }

//         res.json({ message: "Invoice updated", updatedInvoice });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Delete invoice by invoiceID
// exports.deleteInvoice = async (req, res) => {
//     try {
//         const db = req.db;
//         const invoiceID = req.params.invoiceID;

//         const result = await db.collection("invoices").deleteOne({ invoiceID });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({ error: "Invoice not found" });
//         }

//         res.json({ message: "Invoice deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };