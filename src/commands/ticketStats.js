const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {

data: new SlashCommandBuilder()
.setName("ticketstats")
.setDescription("View ticket statistics"),

async execute(interaction){

const tickets = interaction.guild.channels.cache
.filter(c=>c.name.startsWith("ticket-"))

const embed = new EmbedBuilder()
.setColor("#00ffff")
.setTitle("🐉 FRX Ticket Stats")
.setDescription(`Open Tickets: **${tickets.size}**`)
.setFooter({text:"FRX | BETA-02"})
.setTimestamp()

interaction.reply({embeds:[embed]})

}

}