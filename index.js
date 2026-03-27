require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
    if (!channel) return;

    const avatar = member.user.displayAvatarURL({ extension: 'png' });
    const image = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/3ZUrjUP.png&text1=Welcome&text2=${member.user.username}&text3=Member&avatar=${avatar}`;

    channel.send({
        content: `🎉 Welcome ${member}`,
        files: [image]
    });
});

client.on('guildMemberRemove', async (member) => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
    if (!channel) return;

    const avatar = member.user.displayAvatarURL({ extension: 'png' });
    const image = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/8Km9tLL.png&text1=Goodbye&text2=${member.user.username}&text3=Left&avatar=${avatar}`;

    channel.send({
        content: `😢 Goodbye ${member.user.tag}`,
        files: [image]
    });
});

client.login(process.env.TOKEN);
