const quote = /[\s"']/

function stringifyPair ([key, val]) {
  let strval = ''
  switch (typeof val) {
    case 'string':
      try {
        strval = JSON.stringify(JSON.parse(val), null, 0)
      } catch (e) {
        strval = quote.test(val) ? JSON.stringify(val) : val
      }
      break
    case 'boolean':
    case 'number':
      strval = String(val)
      break
    case 'undefined':
      strval = ''
      break
    case 'object':
      if (val !== null) {
        strval = JSON.stringify(val, null, 0)
      }
      break
  }
  return `${key}=${strval}`
}

export default function stringify (obj) {
  if (typeof obj !== 'object') {
    throw new Error('stringify() expects an object')
  }
  return Object.entries(obj).map(stringifyPair).join('\n')
}
