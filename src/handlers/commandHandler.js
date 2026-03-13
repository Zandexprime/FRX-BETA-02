const fs = require("fs")

module.exports = (client)=>{

const commandFiles = fs.readdirSync("./src/commands")

for(const file of commandFiles){

const command = require(`../commands/${file}`)

client.commands.set(command.data.name,command)

}

console.log(`Loaded ${client.commands.size} commands`)

}