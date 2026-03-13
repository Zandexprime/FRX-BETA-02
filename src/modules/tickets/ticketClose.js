const transcript = require("../../utils/transcriptGenerator")

module.exports = async (interaction)=>{

await interaction.reply("Closing ticket...")

await transcript(interaction.channel)

setTimeout(()=>{
interaction.channel.delete()
},5000)

}