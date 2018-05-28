module.exports = {
  get : {
    /**
     * Gets dietary restriction options
     * @param {function} success success callback
     * @param {function} error error callback
     * @returns a boolean if valid
     */
    getDietOptions: function() {
      return new Promise(resolve => {
        resolve(this.getDietOptions())
      })
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
        error('Empty partyKey')
        return
      }
      if (data.partyKey.length > 14){
        error(`Invalid partyKey length. The max party key length is 14, but received ${data.partyKey.length}`)
        return
      }
      let partyKey = encodeURIComponent(data.partyKey)
      return this.getPartyData(partyKey)
    },

    /**
     * Saves the rsvp info to database
     * @param {object} data 
     * @returns a boolean if valid
     */
    saveRsvp: function (data, success, error) {
      //TODO: implement
    }
  }
}
