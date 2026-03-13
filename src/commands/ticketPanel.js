const { SlashCommandBuilder } = require("discord.js")

module.exports = {

data:new SlashCommandBuilder()
.setName("ticketpanel")
.setDescription("Create ticket panel"),

async execute(interaction){

await interaction.reply({
content:"Use **/setuptickets** to create the panel.",
ephemeral:true
})

}

}