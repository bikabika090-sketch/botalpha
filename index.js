require('dotenv').config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
    if (!channel) return;

    const file = new AttachmentBuilder(path.join(__dirname, 'background.png'));

    channel.send({
        content: `🔥 Welcome to Alpha Server ${member}`,
        files: [file]
    });
});

client.on('guildMemberRemove', async (member) => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
    if (!channel) return;

    const file = new AttachmentBuilder(path.join(__dirname, 'background.png'));

    channel.send({
        content: `😢 Goodbye ${member.user.tag}`,
        files: [file]
    });
});

client.login(process.env.TOKEN);
