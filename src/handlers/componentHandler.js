const ticketManager = require("../modules/tickets/ticketManager")
const ticketClose = require("../modules/tickets/ticketClose")
const ticketClaim = require("../modules/tickets/ticketClaim")

module.exports = async (interaction) => {

if (!interaction.isButton()) return

try {

/* OPEN TICKETS */

if (interaction.customId === "ticket_support") {
return ticketManager.createTicket(interaction, "Support")
}

if (interaction.customId === "ticket_report") {
return ticketManager.createTicket(interaction, "Report")
}

if (interaction.customId === "ticket_partnership") {
return ticketManager.createTicket(interaction, "Partnership")
}

/* STAFF ACTIONS */

if (interaction.customId === "ticket_claim") {
return ticketClaim(interaction)
}

if (interaction.customId === "ticket_close") {
return ticketClose(interaction)
}

} catch (error) {
console.error("Component Error:", error)
}

}