module.exports = {
  get : {
    /**
     * Gets dietary restriction options
     * @param {function} success success callback
     * @param {function} error error callback
     * @returns a boolean if valid
     */
    getDietOptions: function() {
      return Promise.resolve(this.getDietOptions())
    }
  },

  post: {
    /**
     * Verifies the party key
     * @param {object} data expected { partyKey : {string} }
     * @param {function} success success callback
     * @param {function} error error callback
     * @returns a boolean if valid
     */
    getPartyData: function (data) {
      if (!data.partyKey) {
        return Promise.reject(new Error('Empty partyKey'))
      }
      if (data.partyKey.length > 14){
        return Promise.reject(new Error(`Invalid partyKey length. The max party key length is 14, but received ${data.partyKey.length}`))
      }
      let partyKey = encodeURIComponent(data.partyKey)
      return this.getPartyData(partyKey)
    },

    /**
     * Saves the rsvp info to database
     * @param {object} data 
     * @returns a boolean if valid
     */
    saveRsvp: function (data) {
      return this.savePartyData(data.partyData)
    }
  }
}
