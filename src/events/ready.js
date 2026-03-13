module.exports = {
    name: "ready",
    once: true,
    execute(client){
        console.log(`🐉 FRX BETA-02 Online as ${client.user.tag}`)
    }
}