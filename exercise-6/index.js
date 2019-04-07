// get a property from an object if exist or return a default value
const getProperty = (obj, property, defaultValue) =>
  obj && obj.hasOwnProperty(property) ? obj[property] : defaultValue

// high order function
const accesorFn = (obj, defaultValue) => {
  return path => {
    // convert path into an array of properties
    const properties = path.split('.')
    // reduce the properties array to a single property value
    return properties.reduce(
      (acc, property) => getProperty(acc, property, defaultValue),
      obj
    )
  }
}

export const accessor = (obj, defaultValue, path) => {
  const fn = accesorFn(obj, defaultValue)
  return path ? fn(path) : fn
}
