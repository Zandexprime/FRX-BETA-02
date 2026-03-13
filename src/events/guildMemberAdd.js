const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {

        // Find welcome channel
        const channel =
            member.guild.channels.cache.find(
                ch => ch.name.toLowerCase().includes("welcome")
            ) || member.guild.systemChannel;

        if (!channel) return;

        const memberCount = member.guild.memberCount;
        const userName = member.user.username;
        const guildName = member.guild.name;

        const avatar = member.user.displayAvatarURL({
            extension: "png",
            size: 512
        });

        // Generate welcome card
        const welcomeImage =
            `https://api.popcat.xyz/welcomecard` +
            `?background=https://i.imgur.com/8M7Y79r.jpeg` +
            `&text1=${encodeURIComponent(userName)}` +
            `&text2=Welcome+to+${encodeURIComponent(guildName)}` +
            `&text3=Member+${memberCount}` +
            `&avatar=${encodeURIComponent(avatar)}`;

        const embed = new EmbedBuilder()
            .setColor("#00ffff")
            .setTitle("🐉 FRX WELCOME")
            .setDescription(`🛡️ Welcome ${member}!\n\nYou are **member #${memberCount}** of **${guildName}**.`)
            .setImage(welcomeImage)
            .setFooter({
                text: "FRX | BETA-02 🛡️ Cyber Security System"
            })
            .setTimestamp();

        try {
            await channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Welcome message failed:", error);
        }
    }
};