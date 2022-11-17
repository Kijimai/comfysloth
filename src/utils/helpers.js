/**
 * Receives a number and returns a US currency formatted price including the symbol.
 * @param {number} price [Any whole number]
 * @returns {string} $price [The new price with the $ sign appended.]
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100)
}

export const getUniqueValues = () => {}
