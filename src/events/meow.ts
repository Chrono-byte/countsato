import { Events } from 'discord.js';
import { client } from '..';
import { prisma } from '../util';

const meows = [
    {
        regex: /(m+(e+|r+)o+w+)|(n+y+a+)|(m+r+p+)/,
        reactions: ['🐱'],
    },
    {
        regex: /(m+e+e+p)/,
        reactions: []
    }
];

client.on(Events.MessageCreate, async (message) => {
    const meow = meows.findIndex((meow) => meow.regex.test(message.content));
    if (meow === -1) return;

    if (message.inGuild()) {
        const data = await prisma.guild.findUnique({ where: { id: message.guildId } });
        if (!data?.meowReactions) return;
    }

    for (const reaction of meows[meow].reactions) {
        await message.react(reaction);
    }

    if (meow === 1 && message.guildId == "873048649163239484") {
        const illnessImo = client.guilds.cache.get("873048649163239484")?.stickers.cache.find(sticker => sticker.name === "illness imo");

        if (!illnessImo) return;

        message.reply({ stickers: [illnessImo] });
    }
});
