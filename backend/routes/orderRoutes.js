const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CREATE ORDER (PUBLIC)
 */
router.post("/", async (req, res) => {
  const { products, totalAmount } = req.body;

  const order = new Order({
    products,
    totalAmount
  });

  await order.save();
  res.json({ message: "Order placed successfully", order });
});

/**
 * GET ALL ORDERS (ADMIN ONLY)
 */
router.get("/", auth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

/**
 * UPDATE ORDER STATUS (ADMIN ONLY)
 */
router.patch("/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(order);
});


module.exports = router;
