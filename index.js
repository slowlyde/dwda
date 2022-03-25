const Discord = require("discord.js");
const client = new Discord.Client();
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("194.56.227.61:30120");
const config = require('./config.json')
const request = require('request');

client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}!`);
   function ServerStatus() {
    const options = {
        url: config.ServerURL
    };

    function callback(error, response, body) {
        const ChannelName = client.channels.cache.find(channel => channel.name === (config.ChannelName))
            ChannelName.messages.fetch(config.MessageID).then(message => {
                server.getPlayers().then((data) => {
                    let result  = [];
                    let result1  = [];
                    let result2  = [];
                    let index = 1;
                    for (let player of data) {
                      // const user = client.users.cache.find(user => user.id === player.user.id)
                      result1.push(player.id);
                      result.push(`[ ID:${player.id} ] \`${player.name}\` (\`${player.ping}\` Ping)`);
                    }
                    const sorted = result1.sort((a, b) => a - b)

                    const playersOnline = server.getPlayersOnline()
                    var space = data.length*100/64
                    const embed = new Discord.MessageEmbed()
                      .setColor("#FFA500")
                      .setAuthor("DevidTurDM | DM Server","https://cdn.discordapp.com/attachments/933145926263013418/933728112624160808/02ecc681737d92c12600f677d8f6a75f.png")
                      .setTitle(`📊 **Status: \`ONLINE\`** \n**👨‍👦 Players: \`${data.length}/64\`**\n**🌟 Space: \`${space}%\`** \n\n   __[ID]__        __NAME__         __(Ping)__`)
                      .setDescription(result.length > 0 ? result : 'No Players Online!')
                      .setImage('https://media.discordapp.net/attachments/640947159084302384/932957987742576690/200.gif')
                      .setThumbnail('https://cdn.discordapp.com/attachments/933145926263013418/933728112624160808/02ecc681737d92c12600f677d8f6a75f.png')
                      .setFooter("DEV: SLOWLY#4467 | Last Update")
                      .setTimestamp();
                      client.user.setActivity(`👨‍👦[${data.length}/64]`, { type: "PLAYING" });
                    message.edit(embed);
                  }).catch((err) => {
                    const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor("DevidTurDM | DM Server","https://cdn.discordapp.com/attachments/933145926263013418/933728112624160808/02ecc681737d92c12600f677d8f6a75f.png")
                    .setTitle(`📊 **Status: \`OFF\`** \n**👨‍👦 Players: \`OFF\`**\n**🌟 Space: \`OFF\`**`)
                    .setImage('https://media.discordapp.net/attachments/640947159084302384/932957987742576690/200.gif')
                    .setThumbnail('https://cdn.discordapp.com/attachments/933145926263013418/933728112624160808/02ecc681737d92c12600f677d8f6a75f.png')
                    .setFooter("DEV: SLOWLY#4467 | Last Update")
                    .setTimestamp();
                    client.user.setActivity(`👨‍👦[OFF]`, { type: "PLAYING" });
                    message.edit(embed);
                  });
                });
    }
    request(options, callback)
}
setInterval(ServerStatus, 5000);
});
client.login("OTMzNDgyNjIzMzg3NDU5NjI0.YeiLcA.s8CYJEalN3G3HVY1bNeeTkwIrb4");