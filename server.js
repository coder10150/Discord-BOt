const Discord = require("discord.js");
const bot = new Discord.Client();

const ytdl = require("ytdl-core");
const token = "TOKEN HERE";
const PREFIX = "PREFIX HERE";
var version = "1.0.3"
const ms = require("ms");
var servers = {};
const usedCommandRecently = new Set();

bot.on("ready", () => {
  console.log("This bot is online");
  bot.user
    .setActivity("Coding Your Mom", { type: "STREAMING" })
    .catch(console.error);
});
bot.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "ping":
      message.channel.send(
        `**You are!** \`${Date.now() - message.createdTimestamp}ms\``
      );
      break;
    case "website":
      message.channel.send("comming soon!");
      break;
    case "info":
      if (args[1] === "version") {
        message.channel.send("Version " + version);
      } else {
        message.channel.send("Invalued Args");
      } 
      break;
   case "uptime":
      let uptimeembed = new Discord.RichEmbed()
        .setTitle("Drippy info")
        .setColor("RANDOM")
        .addField("Uptime", bot.uptime);
      message.channel.send(uptimeembed);
      break;
    case "serverinfo":
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("#d10f12")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Players name", message.author.username)
        .addField("Current Server", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Member Count", message.guild.memberCount)
        .setFooter("Bot made by shawn hamby");
      message.channel.sendEmbed(serverembed);
      break;
    case "kick":
      const user = message.mentions.members.first();
       if (user.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permisssion to use this command");

      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick("You were kicked")
            .then(() => {
              message.reply(`Succesfully kicked ${user.tag}`);
            })
            .catch(err => {
              message.reply("I was unable to kick the member");
              console.log(err);
            });
        } else {
          message.reply("That user ins't in the server");
        }
      } else {
        message.reply("You need to do ?kick @username");
      }
      break;
    case "purge":
      if (usedCommandRecently.has(message.author.id)) {
        message.reply("You have to wait 30 seconds to use this command again");
      } else {
        if (!args[1]) return message.reply("please put a number to clear");
        message.channel.bulkDelete(args[1]);

        usedCommandRecently.add(message.author.id);
        setTimeout(() => {
          usedCommandRecently.delete(message.author.id);
        }, 30000);
      }
      break;
    case "8ball":
      if (!args[2]) return message.reply("Please ask a full question");
      let replies = ["yes", "no", "Ask again later", "idk", "go ask your mom"];

      let result = Math.floor(Math.random() * replies.length);
      let question = args.slice(1).join(" ");

      let ballEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setColor("RANDOM")
        .addField("Question", question)
        .addField("Answer", replies[result]);

      message.channel.send(ballEmbed);
      break;

    case "react":
      message.react("🤡");
      break;
    case "report":
      let rUser = message.guild.member(
        message.mentions.users.first() || message.guild.member.get(args[0])
      );
      if (!rUser) return message.channel.send("Couldn't find user");
      let reason = args.join(" ").slice(22);

      let reportEmbed = new Discord.RichEmbed()
        .setTitle("Reports")
        .setColor("#d10f12")
        .addField("Report User", `${rUser} with ID: ${rUser.id}`)
        .addField(
          "Reported by",
          `${message.author} with ID: ${message.author.id}`
        )
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

      let reportschannel = message.guild.channels.find(`name`, "reports");
      if (!reportschannel)
        return message.channel.send("Could not find reports channel.");

      message.delete().catch(O_o => {});
      reportschannel.send(reportEmbed);
      break;

    case "help":
      let helpembed = new Discord.RichEmbed()
        .setTitle("Help Commands")
        .setColor("RANDOM")
        .addField(".mod", "Shows the mod help commands", true)
        .addField(".music", "Shows the music commands", true)
        .addField(".fun", "Shows the fun commands", true)
      .addField('.botinfo', "tell you the bot info", true)
      .addField("Support", "[Support Server](https://discord.gg/pyYqvnd)", true)
      .addField("Invite link", "[Invite link](https://discordapp.com/api/oauth2/authorize?client_id=634571619351789611&permissions=8&scope=bot)", true);
      message.channel.send(helpembed);
      message.delete()
      break;
    case "mod":
      let modembed = new Discord.RichEmbed()
        .setTitle("Mod Commands")
        .setColor("RANDOM")
        .addField(".kick", "Kicks the person you mention", true)
        .addField(".mute", "Mute the person you mention and the time", true)
        .addField(".clear", "Clear the message of the number you put", true)
        .addField(".website", "Shows website like", true)
        .addField(".say", "Says the message you put", true);
      message.channel.send(modembed);
       message.delete()
      break;
    case "fun":
      let funembed = new Discord.RichEmbed()
        .setTitle("Mod Commands")
        .setColor("RANDOM")
        .addField(".8ball", "Answers your question", true)
        .addField(".react", "Reacts to the command", true)
        .addField(".info", "Type ?info version shows the version of the bot",true);
      message.channel.send(funembed);
       message.delete()
      break;
    case 'botinfo':
      let bicon = bot.user.displayAvatarURL;
      var version = "1.0.3";
    let botembed = new Discord.RichEmbed()
      .setTitle("Bot info")
      .setColor("#d10f12")
      .setThumbnail(bicon)
      .addField("Bot name", bot.user.username)
      .addField("Created on", bot.user.createdAt)
      .addField('version', version)
      .addField("Prefix", `*.*`)
      .addField('Guilds', bot.guilds.size)
      .addField('Uptime', bot.uptime)
      .setFooter('not yet set');

    return message.channel.send(botembed);
       message.delete()
      break;
    case "say":
      if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("You don't have access to use this command");
      let botmessage = args.join(" ");
      message.delete().catch();
      message.channel.send(botmessage);
      break;
    case "music":
      let musicembed = new Discord.RichEmbed()
        .setTitle("Music Commands")
        .setColor("RANDOM")
        .addField(".play", "Only url works", true)
        .addField(".stop", "Stops the songs", true)
        .addField(".skip", "Skips the song", true);
      message.channel.send(musicembed);
       message.delete()
      break;
    case "p":
      function play(connection, message) {
        var server = servers[message.guild.id];

        server.dispatcher = connection.playStream(
          ytdl(server.queue[0], { filter: "audioonly" })
        );

        server.queue.shift();

        server.dispatcher.on("end", function() {
          if (server.queue[0]) {
            play(connection, message);
          } else {
            connection.disconnect();
          }
        });
      }

      if (!args[1]) {
        message.channel.send("You need to provide a link");
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.send("You need to be in a voice channe to play music");
        return;
      }
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: []
        };

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if (!message.guild.voiceConnection)
        message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        });
      message.delete();

      break;
    case 'stopbot':
     message.reply('Bot has been stopped or restarted if you use a process manager)')
		.then(() => {
			console.log(`Bot stopped by ${message.author.tag} (${message.author.id})`);
			process.exit(0);
		});
      break;
    case "s":
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      message.channel.send("I haved skiped the song");
      break;
    case "stop":
      var server = servers[message.guild.id];
      if (message.guild.voiceConnection) {
        for (var i = server.queue.length - 1; i >= 0; i--) {
          server.queue.splice(i, 1);
        }
        server.dispatcher.end();
        message.channel.send("Ending the queue and leaving the voice channel");
        console.log("Stopped the queue");
      }
      if (message.guild.connection) message.guild.voiceConnection.disconnect();
      break;
    case "mute":
      let person = message.guild.member(
        message.mentions.users.first() || message.members.get(args[1])
      );
      if (!person.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Can't mute them");
      if (!person) return message.reply("Cant find that user");

      let mainrole = message.guild.roles.find(role => role.name === "Members");
      let muterole = message.guild.roles.find(role => role.name === "mute");

      if (!muterole) return message.reply("Couldn't find the `mute` role");

      let time = args[2];

      if (!time) {
        return message.reply("You need to put a time");
      }
      person.removeRole(mainrole.id);
      person.addRole(muterole.id);

      message.channel.send(
        `@${person.user.tag} has been muted for ${ms(ms(time))}`
      );

      setTimeout(function() {
        person.addRole(mainrole.id);
        person.removeRole(muterole.id);
        message.channel.send(`@${person.user.tag} has been unmuted!`);
      }, ms(time));

      break;
        case "verify":
      var vyuser = message.author.username;
      //user msg
      let vyusermsg = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setFooter(`hi ${vyuser}`)
        .setThumbnail(`https://verifyservices.net/wp-content/uploads/2018/05/black-registered-logo_verify-cropped.png`)
        .setTimestamp()
        .setDescription("You got verifyed");

      message.member.send(vyusermsg);

      message.channel.send(`hi ${vyuser} welcome to the support server`);

      message.member.addRole("634561295290466314");

      var logsChannel = message.guild.channels.find("name", "logs");
      if (!logsChannel)
        return message.channel.send("Admin or owner make a logs channel");

      logsChannel.send(vyusermsg);

      message.delete();

      break;
  }
  
});
bot.login(token);

// he now has all commands rain bots has