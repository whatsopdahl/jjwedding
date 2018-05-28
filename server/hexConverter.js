/**
 * objects to memoize the results of the decimal to hex conversion
 */
var hexmemos = {}
var decmemos = {}

/**
 * Array mapping integers to hex strings
 */
var hexVals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C',
  'D', 'E', 'F']

/**
 * object mapping hex string values to decimal representations
 */
var decVals = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
  '8': 8, '9': 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15}

/**
 * Converts a decimal number to hex
 * @param {string|number} dec decimal to convert
 * @returns {string} a hexidecimal string
 */
function decimalToHex(dec) {
  if (dec == 0) return '0'
  let hex = countHex.call(this, dec, '')
  hexmemos[dec] = hex
  decmemos[hex] = dec
  return hex
}

/**
 * recursive function that is used to convert a decimal to hex
 * @param {number} dec the decimal number value
 * @param {string} hex the hex string to prepend to
 * @returns {string} a hexidecimal string
 */
function countHex(dec, hex) {
  if (dec === 0) {
    return hex
  }
  if (hexmemos[dec]) {
    return hexmemos[dec]
  }
  let factor = Math.floor(dec/16)
  let remainder = Math.abs(dec - factor*16)
  hex = hexVals[remainder] + hex
  let result = countHex.call(this, factor, hex)
  return result
}

/**
 * Convert a hexidecmial string to a decimal number
 * @param {string} hex hex string to convert
 * @returns {number} a decimal number
 */
function hexToDecimal(hex) {
  if (hex === '0') return 0
  let dec = countDec.call(this, hex, 0)
  hexmemos[dec] = hex
  decmemos[hex] = dec
  return dec
}

/**
 * recursive function that is used to convert a hex string to a decimal number
 * @param {string} hex the hex string
 * @param {number} dec the base 10 number to add to
 * @returns {number} the resulting decimal number
 */
function countDec(hex, dec) {
  if (hex.length === 0) {
    return dec
  }
  if (decmemos[hex]) {
    return decmemos[hex]
  }
  let exp = hex.length - 1
  let hexVal = hex.charAt(0)
  dec += decVals[hexVal] * Math.pow(16, exp)
  let nextHex = hex.slice(1, hex.length)
  let result = countDec.call(this, nextHex, dec)
  return result
}

module.exports = {
  hexToDecimal: hexToDecimal,
  decimalToHex: decimalToHex
}
