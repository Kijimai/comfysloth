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

/** 
 * Takes an array and a string value from an object's key
 * and returns a Set of unique values from the array.
 *  @param {array} items
 *  @param {string} type
 *  @returns {array} Array
*/
export const getUniqueValues = (items, type) => {
  let uniqueValues = items.map((item) => item[type])
  if(type === "colors") {
    uniqueValues = uniqueValues.flat()
  }
  return ["all", ...new Set(uniqueValues)]
}
