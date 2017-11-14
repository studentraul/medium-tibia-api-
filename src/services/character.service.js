const { getTableFromURL } = require('../utils/tabletojson.utils')
const { hasSpecificLength } = require('../utils/validations.utils')

const Character = require('../models/Character')

const getCharacterInfos = (playerName = '') =>
  new Promise(async (resolve, reject) => {
    const playerNameWasNotSent = hasSpecificLength({
      target: playerName,
      length: 0,
    })

    if (playerNameWasNotSent) {
      reject(new Error('Player name is required'))
    }

    try {
      const url = `https://secure.tibia.com/community/?subtopic=characters&name=${playerName}`
      const table = await getTableFromURL(url)

      const character = new Character(table)
      if (character.playerDoesntExists()) {
        console.trace(`Player doesn't exists`)
        reject(Error(`Player doesn't exists`))
      }
      resolve(character.allCharacterInformation)
    } catch (error) {
      console.trace(error)
      reject(error)
    }
  })

module.exports = {
  getCharacterInfos,
}
