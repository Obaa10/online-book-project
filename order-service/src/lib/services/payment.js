const { Payment } = require("./../../models/payment");
const stripe = require("stripe")("process.env.STRIPE_SECRET_KEY");

exports.processPayment = async (req, res, next) => {
  try {
    const { user_id, amount, books_id } = req.body;

    let paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: "usd",
      confirm: true,
    });

    // Simulated payment success
    paymentIntent = { status: "succeeded", id: "payment_intent_id" };

    if (paymentIntent.status === "succeeded") {
      req.paymentIntentId = paymentIntent.id;
      next();
    } else {
      res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
