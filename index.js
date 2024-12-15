const { Client, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

require('dotenv').config();

const client = new Client({ 
   intents: [
      GatewayIntentBits.Guilds, 
      GatewayIntentBits.GuildMessages, 
      GatewayIntentBits.MessageContent
   ]
});
// intents are permissions given to the bot

client.on(Events.ClientReady, readyClient => {
   console.log(`Logged in as ${readyClient.user.tag}!`);
});

// setting command replies
client.on(Events.InteractionCreate, async interaction => {
   if (!interaction.isChatInputCommand()) return;
 
   if (interaction.commandName === 'ping') {
     await interaction.reply('Pong!');
   }
 });
 
client.on('messageCreate', (message) => {
   if (message.author.bot) return;

   console.log(message);
   console.log('-------------------------------------------------');

   const msg = `\n${message.author.username} || ${message.content} || ${Date()} || ${message.channel.name}`


   if (message.system) {
      const msg = `\n${message.author.username} || System : true || ${Date()} || ${message.channel.name}`
   } else {
      message.reply({
         content: `Hi ${message.author.username}`,
      })
   }; 
      fs.appendFile('log.txt', msg, (err) => {
      console.log("Logged the data")
   })
})

client.login(process.env.TOKEN);