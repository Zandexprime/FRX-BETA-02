const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js")

module.exports = async (interaction) => {

const embed = new EmbedBuilder()
.setColor("#00ffff")
.setTitle("🐉 FRX Support Center")
.setDescription(`
Welcome to the **FRX Helpdesk**

Choose a ticket category below.
`)
.setFooter({ text: "FRX | BETA-02 🛡️" })

const row = new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId("ticket_support")
.setLabel("Support")
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
embeds: [embed],
components: [row]
})

await interaction.reply({
content: "🐉 Ticket panel created.",
ephemeral: true
})

}