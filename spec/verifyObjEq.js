const assert = require('assert')
const _ = require('lodash')

function verifyObjEq(obj1, obj2) {
  _.forEach(obj1, (value, key) => {
    assert(!_.isUndefined(obj2[key]), `${key} is undefined for obj2`)
    if (_.includes(['string', 'number', 'null', 'undefined'], typeof value)) {
      assert(value === obj2[key], `obj1.${key} = ${value}, obj2.${key} = ${obj2[key]}`)
    } else if (_.includes(['array', 'object'], typeof value)) {
      verifyObjEq(value, obj2[key])
    }
  })
}

module.exports = verifyObjEq
