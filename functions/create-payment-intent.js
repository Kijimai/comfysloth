// immediately invoke dotenv config to make use of env files
require("dotenv").config()

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY)

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shippingFee, totalAmount } = JSON.parse(event.body)

    const calculateOrderAmount = () => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return shippingFee + totalAmount
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      })
      console.log(paymentIntent)

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      }
    }
  }

  return {
    statusCode: 200,
    body: "payment intent",
  }
}
