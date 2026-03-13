const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {

data: new SlashCommandBuilder()
.setName("setuptickets")
.setDescription("Create the ticket panel"),

async execute(interaction){

const embed = new EmbedBuilder()
.setColor("#00ffff")
.setTitle("🐉 FRX Support Center")
.setDescription("Press a button to open a ticket")
.setFooter({text:"FRX | BETA-02 🛡️"})

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("ticket_support")
.setLabel("Support Ticket")
.setStyle(ButtonStyle.Primary),

new ButtonBuilder()
.setCustomId("ticket_report")
.setLabel("Report User")
.setStyle(ButtonStyle.Danger),

new ButtonBuilder()
.setCustomId("ticket_partnership")
.setLabel("Partnership")
.setStyle(ButtonStyle.Success)

)

await interaction.channel.send({
embeds:[embed],
components:[row]
})

await interaction.reply({
content:"Ticket panel created",
ephemeral:true
})

}

}