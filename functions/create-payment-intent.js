// domain/.netlify/functions/create-payment-intent

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shippingFee, totalAmount } = JSON.parse(event.body)

    console.log(cart, shippingFee, totalAmount)
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    }
  }

  return {
    statusCode: 200,
    body: "payment intent",
  }
}
