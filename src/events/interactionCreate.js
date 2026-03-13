const ticketCreate = require("../modules/tickets/ticketCreate")
const ticketClose = require("../modules/tickets/ticketClose")
const ticketClaim = require("../modules/tickets/ticketClaim")

module.exports = {
    name: "interactionCreate",

    async execute(interaction, client) {

        try {

            /* SLASH COMMANDS */

            if (interaction.isChatInputCommand()) {

                const command = client.commands.get(interaction.commandName)

                if (!command) return

                await command.execute(interaction, client)

            }


            /* BUTTON INTERACTIONS */

            if (interaction.isButton()) {

                if (interaction.customId === "ticket_support") {
                    return ticketCreate(interaction, "support")
                }

                if (interaction.customId === "ticket_report") {
                    return ticketCreate(interaction, "report")
                }

                if (interaction.customId === "ticket_partnership") {
                    return ticketCreate(interaction, "partnership")
                }

                if (interaction.customId === "ticket_claim") {
                    return ticketClaim(interaction)
                }

                if (interaction.customId === "ticket_close") {
                    return ticketClose(interaction)
                }

            }

        } catch (error) {

            console.error("Interaction Error:", error)

            if (interaction.replied || interaction.deferred) {

                interaction.followUp({
                    content: "⚠️ Interaction failed.",
                    ephemeral: true
                })

            } else {

                interaction.reply({
                    content: "⚠️ Interaction failed.",
                    ephemeral: true
                })

            }

        }

    }
}