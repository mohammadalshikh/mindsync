const { Client } = require('discord.js');
const { loadUserData, getTaskIdx, saveUserData } = require('../../Handlers/dataHandler')

module.exports = {
    name: 'messageDelete',
    once: false,
    execute(deletedMessage) {
        if (deletedMessage.components[0] && deletedMessage.components[0].components[0] && deletedMessage.components[0].components[0].data && deletedMessage.components[0].components[0].data.custom_id) {
            const userId = deletedMessage.components[0].components[0].data.custom_id.split('-')[2]
            const name = deletedMessage.components[0].components[0].data.custom_id.split('-')[3]
            const taskIndex = getTaskIdx(userId, name)
            if (taskIndex != -1) {
                const userData = loadUserData()
                userData[userId].tasks[taskIndex].deletedMsg = true
                userData[userId].del.push(name)
                saveUserData(userData)
            }
        }
    },
}