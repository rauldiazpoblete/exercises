export const sortIntegerDigits = function(n) {
  // check n is an integer
  if (!Number.isInteger(n)) throw 'Argument must be an integer'
  const result = n
    .toString() // convert to string
    .split('') // create array of digits
    .sort((a, b) => b - a) // sort array in descending order
    .join('') // join array
  return parseInt(result)
}
