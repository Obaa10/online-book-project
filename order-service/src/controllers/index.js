const Payment = require("../models/payment");
const { processPayment } = require("../lib/services/payment");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { amount, books_id } = req.body;
    const payment = await Payment.create({
      user_id: req.user.id,
      books_id: books_id,
      amount: amount,
    });
    res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get payments for a user
exports.getPaymentsByUserId = async (req, res) => {
  try {
    const payments = await Payment.findAll({ where: { user_id: req.user.id } });
    res.json(payments);
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
