const hexConverter = require('../server/hexConverter')
const assert = require('assert')

describe('Hex Converter', () => {
  it('should convert hex values to decimal', () => {
    assert(hexConverter.hexToDecimal('EC6') === 3782)
    assert(hexConverter.hexToDecimal('0') === 0)
    assert(hexConverter.hexToDecimal('462D53CAC9645') === 1234567892342341)
    assert(hexConverter.hexToDecimal('14090BC0000000') === 5639445604728832)
  })

  it('should convert decimal values to hex', () => {
    assert(hexConverter.decimalToHex(3782) === 'EC6')
    assert(hexConverter.decimalToHex(0) === '0')
    assert(hexConverter.decimalToHex(1234567892342341) === '462D53CAC9645')
    assert(hexConverter.decimalToHex(5639445604728832) === '14090BC0000000')
  })
})
