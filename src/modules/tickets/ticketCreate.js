const {
ChannelType,
PermissionFlagsBits,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js")

module.exports = async (interaction,type)=>{

const guild = interaction.guild
const user = interaction.user

const category = guild.channels.cache.find(c=>c.name==="tickets")

if(!category){
return interaction.reply({
content:"⚠️ Please create a **tickets** category first.",
ephemeral:true
})
}

const existing = guild.channels.cache.find(
c=>c.topic === user.id
)

if(existing){
return interaction.reply({
content:`⚠️ You already have a ticket: ${existing}`,
ephemeral:true
})
}

const channel = await guild.channels.create({
name:`ticket-${user.username}`,
type:ChannelType.GuildText,
parent:category.id,
topic:user.id,
permissionOverwrites:[
{
id:guild.roles.everyone,
deny:[PermissionFlagsBits.ViewChannel]
},
{
id:user.id,
allow:[
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory
]
}
]
})

const embed = new EmbedBuilder()
.setColor("#00ffff")
.setTitle("🐉 FRX Ticket System")
.setDescription(`Ticket opened by ${user}

Category: **${type}**

🛡️ Staff will assist you soon.`)
.setFooter({text:"FRX | BETA-02"})
.setTimestamp()

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setCustomId("claim_ticket")
.setLabel("Claim Ticket")
.setStyle(ButtonStyle.Success),

new ButtonBuilder()
.setCustomId("close_ticket")
.setLabel("Close Ticket")
.setStyle(ButtonStyle.Danger)

)

await channel.send({
content:`${user}`,
embeds:[embed],
components:[row]
})

interaction.reply({
content:`🎫 Ticket created: ${channel}`,
ephemeral:true
})

}