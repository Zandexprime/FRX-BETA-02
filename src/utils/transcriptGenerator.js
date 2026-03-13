const fs = require("fs")

module.exports = async (channel)=>{

let messages = await channel.messages.fetch({limit:100})

let html = `
<html>
<head>
<title>FRX Ticket Transcript</title>
<style>
body{font-family:sans-serif;background:#111;color:white}
.message{margin:10px}
.user{color:#00ffff}
</style>
</head>
<body>
<h2>🐉 FRX Ticket Transcript</h2>
`

messages.reverse().forEach(msg=>{

html += `
<div class="message">
<span class="user">${msg.author.tag}</span> :
${msg.content}
</div>
`

})

html += "</body></html>"

fs.writeFileSync(`transcript-${channel.id}.html`,html)

}