const fs = require('fs')
const readDirFiles = require('read-dir-files')
const path = require('path')
const guestDataPath = path.resolve(__dirname, "../guestData")
const csvtojson = require('csvtojson')
const Dao = require('../server/dao')
let dao
try {
  dao = new Dao()
} catch (e) {
  throw e
}

readDirFiles.list(guestDataPath, {}, (err, files) => {
  let promises = []
  for (let i=1; i < files.length; i++) {
    promises.push(filterAndFormat(files[i]))
  }
  return Promise.all(promises).then(result => {
    let flat = result.reduce((sum, val) => {
      return sum.concat(val)
    })
    return writeToCloud(flat);
    // fs.writeFileSync(path.resolve(__dirname, '../guestData.json'), JSON.stringify(writeToCloud(flat), null, 2))
  }).then(cloudWrites => {
    return Promise.all(cloudWrites)
  }).then(() => {
    console.log('written to cloud');
  }).catch(err => {
    throw err
  })
})

function filterAndFormat(csvFile) {
  return csvtojson()
    .fromFile(csvFile)
    .then(data => {
      let filtered = data.filter(guestData => {
        return guestData.Name && !guestData.Name.includes('Total')
      })
      return filtered.map(guestData => {
        return {
          name: guestData.Name,
          count: guestData['# people']
        }
      })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

function writeToCloud(guests) {
  let promises = []
  guests.forEach(guest => {
    if (/(\s&\s[Gg]uest)$/.test(guest.name)) {
      guest.name = guest.name.substr(0, guest.name.length - 8);
    }
    let dsObj = {
      maxSize: parseInt(guest.count),
      name: guest.name,
      rsvped: false,
      attending: null,
      email: null,
      members: getMembers(guest)
    }

    dsObj.size = dsObj.members.length

    promises.push(dao.savePartyData(dsObj));
  })

  return promises;
}

function getMembers(guest) {
  let members
  let splitByComma = guest.name.split(',')
  let splitByAmp = guest.name.split('&')
  if (splitByComma.length > 1) {
    members = extractMembers(splitByComma)
  } else if (splitByAmp.length > 1) {
    members = extractMembers(splitByAmp)
  } else {
    if (guest.name.includes('Family') || guest.name.includes('family')) {
      return []
    }
    let splitBySpace = guest.name.split(' ')
    members = [{
      firstName: splitBySpace[0],
      lastName: splitBySpace[1],
      under21: false,
      under10: false,
      meal: {
        meal: null,
        mask: 0,
        notes: null
      }
    }]
  }

  return members
}

function extractMembers(splitVals) {
  let members = []
  let hasSharedLastName = false, sharedLastName, member
  splitVals.forEach((memberName, index) => {
    memberName = memberName.trim()
    if (memberName.startsWith('&')) {
      memberName = memberName.slice(2, memberName.length)
    }
    if (memberName.includes('Guest') || memberName.includes('guest') || memberName.includes('Family') || memberName.includes('family')) return

    let splitBySpace = memberName.split(' ')
    member = {
      firstName: splitBySpace[0],
      under21: false,
      under10: false,
      meal: {
        meal: null,
        mask: 0,
        notes: null
      }
    }
    if (splitBySpace.length > 1) {
      member.lastName = splitBySpace[1]
      if (index === splitVals.length - 1) {
        sharedLastName = splitBySpace[1]
      }
    } else {
      hasSharedLastName = true
    }

    members.push(member)
  })

  if (hasSharedLastName) {
    for (let i=0; i < members.length; i++) {
      if (!members[i].lastName) {
        members[i].lastName = sharedLastName
      }
    }
  }

  return members
}