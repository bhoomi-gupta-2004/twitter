const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Multer Setup - Store files temporarily before uploading to Cloudinary
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads/");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Upload Route
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "twitter-clone/uploads", // Optional: Organize files in Cloudinary
        });

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        res.json({ url: result.secure_url, public_id: result.public_id });
    } catch (error) {
        res.status(500).json({ error: "Image upload failed", details: error.message });
    }
});

module.exports = router;
