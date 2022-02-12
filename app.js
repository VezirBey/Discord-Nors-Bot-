const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar
const db = require('quick.db') // database modülü
const momentd = require('moment-duration-format')
const moment = require('moment')

client.commands= new Discord.Collection(); // komutları alıyoruz

const config = require('./config.json') //config.json u tanımlıyoruz.

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.kod, command); // Komutları Ayarlıyoruz.
}

///-------------------------------------- Guild Member Add --------------------------------------///

client.on("guildMemberAdd", member => {  
    let date = moment(member.user.createdAt)
    const welcome = client.channels.cache.get(config.kayıtchat)
        
    let user = client.users.cache.get(member.id);
      require("moment-duration-format");
      let memberDay = (Date.now() - member.user.createdTimestamp);
      const kurulus = new Date().getTime() - date;member.user.createdAt;
      const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
     
  
    moment.locale("tr");
  
   if (memberDay > 1296000000) {
    welcome.send(" Sunucumuza hoş geldin <@" + member + ">\n\n Hesabın "+ gecen +" Önce Oluşturulmuş\n\n Sunucu kurallarımız " + config.kurallar + " kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.\n\n Sunucumuzun **" + member.guild.memberCount + "**. üyesisin. Taglarımızdan (✧, #1654) birini alarak bizlere destek ola bilirsin!\n\n**➤ Soldaki ses teyit odalarından birine girerek,**" + config.kayıtrolü + "**rolüne sahip yetkililerimize teyit verip kayıt ola bilirsin!**")
     } else { 

        member.roles.remove(config.kayıtsızrol)
        member.roles.add(config.karantinarol)
   welcome.send(" <@" + member + "> Adlı kullanıcının hesabı 15 gün den önce kurulduğu için karantinaya düştü.")
     }});
     
///-------------------------------------- Guild Member Add --------------------------------------///

///-------------------------------------- Tag Alana Rol --------------------------------------///

client.on("userUpdate", async (oldUser, newUser) => {  
    if (oldUser.username !== newUser.username) {
            let tag = config.tag
            let sunucu = config.sunucu
            let kanal = config.tagkanal 
            let rol = config.tagrol
  
            
  
    try {
  
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(` ${newUser} \`${tag}\` Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);  
    }
    if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
    await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(` ${newUser} \`${tag}\` Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
    await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
    }  
  } catch (e) {
  console.log(`Bir hata oluştu! ${e}`)
   }
  }  
  });

///-------------------------------------- Tag Alana Rol --------------------------------------///
client.on("error", console.error);

client.on('ready', () => {
    client.user.setActivity('Zelaxin 💜 Vezir Oni') //botun oynutor kısmı
    console.log('Botumuz Aktif') //botu başlattığımızda konsolda atılacak mesaj.
});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return message.channel.send(`Komut dosyamda **${command}** adlı bir komut bulamadım.`);


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(config.token)
