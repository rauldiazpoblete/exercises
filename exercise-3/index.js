// Auxiliar method to get 2 digit number
// with a leading zero if needed
function addLeadingZero(str) {
  return str.length < 2 ? `0${str}` : str
}

export const formatDate = function(userDate) {
  // format from M/D/YYYY to YYYYMMDD
  const dateItems = userDate.split('/')
  if (dateItems.length !== 3 || dateItems[2].length !== 4) {
    // throw error if userDate has bad format
    throw 'userDate has a wrong format: must be M/D/YYYY'
  } else {
    return `${dateItems[2]}${addLeadingZero(dateItems[0])}${addLeadingZero(
      dateItems[1]
    )}`
  }
}
