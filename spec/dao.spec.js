const DAO = require('../server/dao')
const _ = require('lodash')
const assert = require('assert')
const verifyObjectEquality = require('./verifyObjEq')

describe('DAO', () => {
  let dao, opdahlParty, denglerParty

  beforeAll(() => {
    dao = new DAO()
    opdahlParty = {
      maxSize: 2,
      size: 1,
      name: 'Opdahl',
      rsvped: false,
      attending: null,
      email: null,
      members: [
        {
          firstName: 'Tim',
          lastName: 'Opdahl',
          under21: false,
          meal: {
            mask: 0,
            notes: null
          }
        }
      ]
    }

    denglerParty = {
      maxSize: 3,
      size: 3,
      name: 'Dengler',
      rsvped: false,
      attending: null,
      email: null,
      members: [
        {
          firstName: 'Jim',
          lastName: 'Dengler',
          under21: false,
          meal: {
            mask: 0,
            notes: null
          }
        },
        {
          firstName: 'Chris',
          lastName: 'Dengler',
          under21: false,
          meal: {
            mask: 0,
            notes: null
          }
        },
        {
          firstName: 'Peter',
          lastName: 'Dengler',
          under21: true,
          meal: {
            mask:0,
            notes: null
          }
        }
      ]
    }
  })

  xit('should insert a record into the cloud', done => {
    dao.savePartyData(party)
      .then(id => {
        done()
      })
      .catch(err => {
        done.fail(err)
      })
  })

  xit("should get all parties", done => {
    const query = dao.datastore
      .createQuery('party')

    dao.getAllParties.then(parties => {
      assert(parties.length > 0)
      done()
    }).catch(err => {
      done.fail(err)
    })
  })

  xit("should get all guests", done => {
    dao.getAllGuests.then(guests => {
      assert(guests.length > 0)
      done()
    }).catch(err => {
      done.fail(err)
    })
  })

  it("should verify party id as valid", done => {
    dao.getPartyData('14090BC').then(result => {
      verifyObjectEquality(result, denglerParty)
      done()
    }).catch(err => {
      done.fail(err)
    })
  })

  it("should verify party id as invalid", done => {
    dao.verifyPartyKey('F230ED1').then(() => {
      done.fail('Should detect invalid party key')
    }).catch(err => {
      done()
    })
  })

  fit('should get the total number of guests', done => {
    dao.getGuestCount().then(count => {
      assert(count === 3, `expected 3, but got ${count}`)
      done()
    }).catch(e => {
      console.log(e)
      done.fail()
    })
  })
})
