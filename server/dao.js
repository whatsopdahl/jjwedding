const GDatastore = require('@google-cloud/datastore')
const _ = require('lodash')
const hexConverter = require('./hexConverter')
const hexToDecimal = hexConverter.hexToDecimal
const decimalToHex = hexConverter.decimalToHex
const logger = require('./logger')
const path = require('path')

module.exports = class DAO {
  /**
   */
  constructor() {
    this.datastore = new GDatastore({
      keyFilename: path.resolve(__dirname, '../JJWedding-gcp-creds.json')
    })
  }

  /**
   * Verifies the party key is valid, and retrieves the party data
   * @param {string} id the (URIencoded) unique party id
   */
  getPartyData(id) {
    let givenId = id
    while (id.length < 14) {
      id += '0'
    }
    id = _.toUpper(id)
    let numericalId = hexToDecimal(id)
    return new Promise((resolve, reject) => {
      this.datastore.get(this.datastore.key(['party', numericalId]), (err, entity) => {
        if (err) {
          reject(err)
        } else if (!entity) {
          logger.log(`Invalid party key: ${id}`)
          reject(new Error(`Invalid party key: ${givenId}. Please ensure you've typed the key correctly.`))
        }
        resolve(_.assign(entity, {id: hexToDecimal(id)}))
      })
    })
  }

  /**
   * Gets dietary restriction options
   * @returns {Array} array of diet option objects
   */
  getDietOptions() {
    return [
			{
				classification : "Vegetarian",
				value : 1
			},
			{
				classification : "Gluten-free",
				value : 2
			}
		]
  }

  /**
   * Gets the meal options
   * @returns {Array} array of meal options
   */
  getMealOptions() {
    return [
      {
        name: 'Sea Bass',
        description: 'Grilled Sea Bass with wasabi ginger sauce',
        labels: ['DF']
      },
      {
        name: 'Chicken Breast',
        description: 'Herb-roasted wingtip chicken breast with roasted garlic herb sauce',
        labels: ['GF', 'DF']
      },
      {
        name: 'Butternut Squash Ravioli',
        description: 'Served with mascarpone sage cream and vegetable ratatouille',
        labels: ['V']
      }
    ]
  }

  /**
   * gets all the parties stored in the database
   * @returns {Promise} of an array of all parties
   */
  getAllParties() {
    const query = this.datastore
      .createQuery('party')

    return this.datastore.runQuery(query).then(result => {
      return result[0]
    })
  }

  /**
   * gets all the guests
   * @returns {Promise} a promise resolving with an array of members
   */
  getAllGuests() {
    return this.getAllAttending().then(parties => {
      return _.flatMap(parties, party => {
        return party.members
      })
    })
  }

  /**
   * gets all guests under21
   * @returns {Promise} of an array of guests under21
   */
  getAllUnder21() {
    return this.getAllGuests().then(guests => {
      return _.filter(guests, guest => {
        return guest.under21
      })
    })
  }

  /**
   * gets all guests that have a Vegetarian dietary restriction
   * @returns {Promise} of an array of all guests that are vegetarian
   */
  getAllVegetarian() {
    return this.getAllGuests().then(guests => {
      return _.filter(guests, guest => {
        return guest.meal.mask === 1 || guest.meal.mask === 3
      })
    })
  }

  /**
   * gets all guests that have a gluten-free dietary restriction
   * @returns {Promise} of an array of all guests that are vgluten-free
   */
  getAllGlutenFree() {
    return this.getAllGuests().then(guests => {
      return _.filter(guests, guest => {
        return guest.meal.mask >= 2
      })
    })
  }

  /**
   * gets all guests that have a Vegetarian and gluten-free dietary restriction
   * @returns {Promise} of an array of all guests that are gluten-free
   */
  getAllGlutenFreeAndVegetarian() {
    return this.getAllGuests().then(guests => {
      return _.filter(guests, guest => {
        return guest.meal.mask === 3
      })
    })
  }

  /**
   * gets all guests with dietary notes
   * @returns {Promise} of an array of all guests with notes
   */
  getAllDietaryNotes() {
    return this.getAllGuests().then(guests => {
      return _.filter(guests, guest => {
        return guest.meal.notes
      })
    })
  }

  /**
   * gets all the parties that have rsvped
   * @returns {Promies} of an array of all parties that have rsvped
   */
  getAllRSVPs() {
    const query = this.datastore
          .createQuery('party')
          .filter('rsvped', true)

    return this.datastore.runQuery(query).then(result => {
      let smaller = []
      _.forEach(result[0], (party) => {
        smaller.push(_.pick(party, ['name', 'size', 'attending']))
      })
      return smaller
    })
  }

  /**
   * gets all parties attending
   * @returns {Promise} of an array of all parties that are attending
   */
  getAllAttending() {
    const query = this.datastore
      .createQuery('party')
      .filter('attending', true)

    return this.datastore.runQuery(query).then(results => {
      return results[0]
    })
  }

  /**
   * get the total number of guests attending
   * @returns {Promise} of the number of guests attending
   */
  getGuestCount() {
    return this.getAllAttending().then(attending => {
      let total
      return _.reduce(attending, (total, obj) => {
        return total + obj.size
      }, 0)
    })
  }

  /**
   * get everyone who has not rsvped
   * @returns {Promise} of an array of all the parties who have not rspved
   */
  getAllNonRsvps() {
    const query = this.datastore
      .createQuery('party')
      .filter('rsvped', false)

    return this.datastore.runQuery(query).then(result => {
      let smaller = []
      _.forEach(result[0], (party) => {
        smaller.push(_.pick(party, ['name', 'size', 'attending']))
      })
      return smaller
    })
  }

  /**
   * get the data for given parties by name
   * @param {string} name the name of the party to search for
   */
  getPartyByName(name) {
    const query = this.datastore
      .createQuery('party')
      .filter('name', name)

    return this.datastore.runQuery(query).then(result => {
      return _.map(result[0], party => {
        return _.assign(party, {
          'id': this.getKeyFromId(party[this.datastore.KEY].id)
        })
      })
    })
  }

  /**
   * utility function to get the hex key fro mthe numerical id
   * @param {integer} decimalId the base 10 id from the datastore
   * @returns {string} truncated hexKey to put on invite
   */
  getKeyFromId(decimalId) {
    let hexKey = decimalToHex(decimalId)
    let i = hexKey.length - 1
    while (i > 0 && hexKey[i] === '0') {
      i--
    }
    return _.truncate(hexKey, {
      length: i+1,
      omission: ''
    })
  }

  /**
   * Gets a list of all parties and their keys
   * @returns {Promise.<Array>} an array of party names mapped to keys
   */
  getPartiesAndKeys() {
    return this.getAllParties().then(parties => {
      return _.map(parties, party => {
        return {[party.name]: this.getKeyFromId(party[this.datastore.KEY].id)}
      })
    })
  }

  /**
   * Saves the updated party data
   * @param {object} data
   */
  savePartyData(party) {
    if (!party.id) {
      party.id = this.datastore.key('party')
    } else {
      party.id = this.datastore.key(['party', party.id])
    }
    const partyEntity = this.createPartyEntity(party)

    return this.datastore.upsert(partyEntity)
      .then(() => {
        logger.log(`Party ${party.id.id} saved successfully.`)
        return party.id
      })
      .catch(err => {
        return err
      });
  }

  /**
    {
      id : {key},
      maxSize : {int},
      size : {int},
      name : {string},
      attending : {boolean},
      rsvped : {boolean},
      email : {string},
      members : [ ... ]
    }
   */
  createPartyEntity(party) {
    return {
      key: party.id,
      data: [
        {
          name: 'maxSize',
          value: party.maxSize,
          excludeFromIndexes: true
        },
        {
          name: 'size',
          value: party.size,
          excludeFromIndexes: true
        },
        {
          name: 'attending',
          value: party.attending,
        },
        {
          name: 'name',
          value: party.name
        },
        {
          name: 'rsvped',
          value: party.rsvped,
        },
        {
          name: 'email',
          value: party.email,
          excludeFromIndexes: true
        },
        {
          name: 'members',
          value: party.members,
          excludeFromIndexes: false
        }
      ]
    }
  }
}
