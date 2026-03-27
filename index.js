require('dotenv').config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
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

    const canvas = createCanvas(1024, 500);
    const ctx = canvas.getContext('2d');

    const background = await loadImage(path.join(__dirname, 'background.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 50px sans-serif';
    ctx.fillStyle = '#00bfff';
    ctx.textAlign = 'center';
    ctx.fillText('Welcome to Alpha Server', canvas.width / 2, 100);

    ctx.font = '35px sans-serif';
    ctx.fillText(member.user.username, canvas.width / 2, 160);

    const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png' }));
    ctx.beginPath();
    ctx.arc(512, 300, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 412, 200, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome.png' });

    channel.send({
        content: `🔥 Welcome ${member}`,
        files: [attachment]
    });
});

client.on('guildMemberRemove', async (member) => {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
    if (!channel) return;

    const canvas = createCanvas(1024, 500);
    const ctx = canvas.getContext('2d');

    const background = await loadImage(path.join(__dirname, 'background.png'));
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 50px sans-serif';
    ctx.fillStyle = '#ff4d4d';
    ctx.textAlign = 'center';
    ctx.fillText('Goodbye', canvas.width / 2, 100);

    ctx.font = '35px sans-serif';
    ctx.fillText(member.user.username, canvas.width / 2, 160);

    const avatar = await loadImage(member.user.displayAvatarURL({ extension: 'png' }));
    ctx.beginPath();
    ctx.arc(512, 300, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 412, 200, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'goodbye.png' });

    channel.send({
        content: `😢 Goodbye ${member.user.tag}`,
        files: [attachment]
    });
});

client.login(process.env.TOKEN);
