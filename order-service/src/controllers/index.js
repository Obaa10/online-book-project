const Payment = require("../models/payment");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { user_id, amount, books_id } = req.body;
    const payment = await Payment.create({
      user_id: user_id,
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
    const { user_id } = req.params;
    const payments = await Payment.findAll({ where: { user_id: user_id } });
    res.json(payments);
  } catch (error) {
    console.error("Error retrieving payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
