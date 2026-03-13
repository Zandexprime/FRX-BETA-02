const { createCanvas, loadImage } = require("canvas")

module.exports = async (member) => {

const canvas = createCanvas(1024, 450)
const ctx = canvas.getContext("2d")

/* BACKGROUND */

const background = await loadImage("assets/welcome-bg.png")
ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

/* AVATAR */

const avatar = await loadImage(member.user.displayAvatarURL({ extension: "png" }))

ctx.save()
ctx.beginPath()
ctx.arc(180, 225, 120, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()
ctx.drawImage(avatar, 60, 105, 240, 240)
ctx.restore()

/* TEXT */

ctx.fillStyle = "#00ffff"
ctx.font = "bold 48px sans-serif"
ctx.fillText("WELCOME", 380, 160)

ctx.font = "40px sans-serif"
ctx.fillText(member.user.username, 380, 230)

ctx.font = "28px sans-serif"
ctx.fillText(`Member #${member.guild.memberCount}`, 380, 300)

ctx.font = "26px sans-serif"
ctx.fillText(member.guild.name, 380, 350)

return canvas.toBuffer()

}