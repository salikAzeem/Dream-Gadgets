const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const cloudinary = require("../cloudinary");

const router = express.Router();

/* ================= MULTER MEMORY STORAGE ================= */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* ================= ADD PRODUCT (ADMIN ONLY) ================= */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "dream-gadgets",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const product = new Product({
      name,
      price,
      category,
      description,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Product upload failed" });
  }
});

/* ================= UPDATE PRODUCT (ADMIN ONLY) ================= */
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "dream-gadgets",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      updates.image = uploadResult.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: "Product update failed" });
  }
});

/* ================= GET ALL PRODUCTS (PUBLIC) ================= */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/* ================= DELETE PRODUCT (ADMIN ONLY) ================= */
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
