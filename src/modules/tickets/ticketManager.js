const {
ChannelType,
PermissionFlagsBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js")

module.exports.createTicket = async (interaction, type) => {

const guild = interaction.guild
const user = interaction.user

const category = guild.channels.cache.find(
c => c.name === "tickets" && c.type === ChannelType.GuildCategory
)

if (!category) {
return interaction.reply({
content: "⚠️ Ticket category not configured.",
ephemeral: true
})
}

/* PREVENT DUPLICATE */

const existing = guild.channels.cache.find(
c => c.topic === user.id
)

if (existing) {
return interaction.reply({
content: `⚠️ You already have a ticket: ${existing}`,
ephemeral: true
})
}

/* CREATE CHANNEL */

const channel = await guild.channels.create({
name: `ticket-${user.username}`,
type: ChannelType.GuildText,
parent: category.id,
topic: user.id,
permissionOverwrites: [

{
id: guild.roles.everyone,
deny: [PermissionFlagsBits.ViewChannel]
},

{
id: user.id,
allow: [
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory
]
}

]
})

/* EMBED */

const embed = new EmbedBuilder()
.setColor("#00ffff")
.setTitle("🐉 FRX Support Ticket")
.setDescription(`
User: ${user}

Category: **${type}**

🛡️ A staff member will assist shortly.
`)
.setFooter({ text: "FRX | BETA-02" })
.setTimestamp()

const buttons = new ActionRowBuilder().addComponents(

new ButtonBuilder()
.setCustomId("ticket_claim")
.setLabel("Claim")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("ticket_close")
.setLabel("Close")
.setStyle(ButtonStyle.Danger)

)

await channel.send({
content: `${user}`,
embeds: [embed],
components: [buttons]
})

interaction.reply({
content: `🎫 Ticket created: ${channel}`,
ephemeral: true
})

}