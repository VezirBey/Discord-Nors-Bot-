const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
  kod: "k",
  async run (client, message, args) {

    const config = require('../config.json')

    if(!message.member.roles.cache.has(config.kayıtrolü))
    return message.channel.send(new Discord.MessageEmbed() .setAuthor(`Dikkat!`, guild.iconURL({dynamic : true})) .setDescription(`Kayıt komutunu kullanabilmek için \`Register Hammer\` rolüne sahip olmalısın.`) .setColor("RED") .setTimestamp() .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true})));

let kullanici = message.mentions.users.first();
let isim = args.slice(1).join(' ');
let member = message.mentions.members.first();
let guild = message.channel.guild


if(!member) return message.channel.send(
new Discord.MessageEmbed()
.setColor('RED')
.setAuthor(`Dikkat!`, guild.iconURL({dynamic : true}))
.setDescription('Kayıt edilecek kullanıcıyı etiketlemelisin'))

if(!isim)return message.channel.send(
new Discord.MessageEmbed()
.setColor('RED')
.setAuthor(`Dikkat!`, guild.iconURL({dynamic : true}))
.setDescription(`${member}'ın isimini  yazmalısın'`))

 
  member.roles.remove(config.kayıtsızrol)
  member.roles.add(config.kadınrol)

  const embed1 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setAuthor(`Kayıt Yapıldı!`, guild.iconURL({dynamic : true}))
      .setDescription(`• ${member} **aramıza** <@&${config.kadınrol}> **rolleriyle katıldı.**\n\n> **Kaydı gerçekleştiren yetkili :** ${message.author}\n\n> **Aramıza hoş geldin :** ${member}`)
      .setThumbnail(kullanici.displayAvatarURL({dynamic : true}))
      .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true}))
      .setTimestamp()
client.channels.cache.get(config.genelchat).send(embed1)

const embed2 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setAuthor(`Kayıt Yapıldı!`, guild.iconURL({dynamic : true}))                                                                                                                            
      .setDescription(`> **Kayıt Bilgileri**\n **• Kayıt Edilen Kullanıcı:** ${member}\n **• Kayıt Eden Yetkili:** ${message.author}\n **• Verilen Roller:** <@&${config.kadınrol}>\n **• Yeni İsim:** \`${config.tag} ${isim}\`\n **• Kayıt Türü:** \`Cinsiyet / Kız\``)
      .setThumbnail(kullanici.displayAvatarURL({dynamic : true}))
      .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true}))
      .setTimestamp()
client.channels.cache.get(config.kayıtlog).send(embed2)

db.add(`kızsayısı.${message.author.id}`, +1);
const kızsayısı = db.fetch(`kızsayısı.${message.author.id}`)

const user = message.mentions.users.first()

message.guild.members.cache.get(kullanici.id).setNickname(`${config.tag} ${isim}`)
 return message.channel.send(
 new Discord.MessageEmbed()
    .setColor('GREEN')
    .setAuthor(`Kayıt Yapıldı!`, guild.iconURL({dynamic : true}))
    .setAuthor(`${config.isim} Kayıt Yapıldı!`, guild.iconURL({dynamic : true}))
    .setThumbnail(kullanici.displayAvatarURL({dynamic : true}))
    .setDescription(`> **Kayıt Bilgileri**\n **• Kayıt Edilen Kullanıcı:** ${member}\n **• Kayıt Eden Yetkili:** ${message.author}\n **• Verilen Roller:** <@&${config.kadınrol}>\n **• Yeni İsim:** \`${config.tag} ${isim}\`\n **• Kayıt Türü:** \`Cinsiyet / Kız\``)
    .setFooter(`${message.author.username} Kız kayıt sayın: ${kızsayısı}`, message.author.avatarURL({ dynamic: true }))
)}
}