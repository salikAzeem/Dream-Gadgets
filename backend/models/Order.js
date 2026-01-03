const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      { name: String, price: Number, quantity: { type: Number, default: 1 } }
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
