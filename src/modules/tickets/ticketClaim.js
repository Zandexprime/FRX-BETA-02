const { EmbedBuilder } = require("discord.js")

module.exports = async (interaction)=>{

const embed = new EmbedBuilder()
.setColor("#00ffff")
.setDescription(`🛡️ Ticket claimed by ${interaction.user}`)

await interaction.channel.send({embeds:[embed]})

await interaction.reply({
content:"Ticket claimed successfully.",
ephemeral:true
})

}