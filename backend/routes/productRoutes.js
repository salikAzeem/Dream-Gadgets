const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const cloudinary = require("../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express.Router();

// Image upload config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dream-gadgets",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });


/**
 * ADD PRODUCT (ADMIN ONLY)
 */
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.file ? req.file.path : null

    });

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product upload failed" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * GET ALL PRODUCTS (PUBLIC)
 */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/**
 * DELETE PRODUCT (ADMIN ONLY)
 */
router.delete("/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
