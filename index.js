require("dotenv").config()

const { 
Client, 
GatewayIntentBits, 
Collection 
} = require("discord.js")

const express = require("express")
const fs = require("fs")
const path = require("path")

/* CLIENT */

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
})

client.commands = new Collection()

/* LOAD COMMANDS */

const commandsPath = path.join(__dirname, "src/commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for (const file of commandFiles) {

const command = require(`./src/commands/${file}`)

if (!command.data || !command.execute) {
console.log(`⚠️ Invalid command file: ${file}`)
continue
}

client.commands.set(command.data.name, command)

}

console.log(`🛡️ Loaded ${client.commands.size} commands`)

/* LOAD EVENTS */

const eventsPath = path.join(__dirname, "src/events")
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"))

for (const file of eventFiles) {

const event = require(`./src/events/${file}`)

if (event.once) {
client.once(event.name, (...args) => event.execute(...args, client))
} else {
client.on(event.name, (...args) => event.execute(...args, client))
}

}

console.log(`🐉 Loaded ${eventFiles.length} events`)

/* HEALTH SERVER */

const app = express()

app.get("/", (req, res) => {
res.send("FRX | BETA-02 🐉🛡️ BOT ONLINE")
})

const PORT = 8000

app.listen(PORT, () => {
console.log(`🌐 Health server running on port ${PORT}`)
})

/* LOGIN */

client.login(process.env.TOKEN)