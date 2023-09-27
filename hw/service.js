const fs = require('node:fs/promises')
const path = require('node:path')

const usersPath = path.join(__dirname, 'users.json')

const reader = async () => {
    const json = await fs.readFile(usersPath, {encoding: "utf-8"})
    return JSON.parse(json)
}

const writer = async (users) => {
    await fs.writeFile(usersPath, JSON.stringify(users))
}

module.exports = {
    reader,
    writer
}
