export const removeProperty = function(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    delete obj[prop]
    return true
  }
  return false
}
