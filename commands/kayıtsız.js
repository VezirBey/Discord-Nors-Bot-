const Discord = require("discord.js");

module.exports = {
  kod: "kayıtsız",
  async run (client, message, args) {

    const config = require('../config.json')

    if(!message.member.roles.cache.has(config.kayıtrolü))
    return message.channel.send(new Discord.MessageEmbed() .setAuthor(`Dikkat!`, guild.iconURL({dynamic : true})) .setDescription(`Kayıt komutunu kullanabilmek için \`Register Hammer\` rolüne sahip olmalısın.`) .setColor("RED") .setTimestamp() .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true})));

    let kullanici = message.mentions.users.first();
    let member = message.mentions.members.first();
    let guild = message.channel.guild
    
    if(!member) return message.channel.send(
        new Discord.MessageEmbed()
        .setColor('RED')
        .setAuthor(`Dikkat!`, guild.iconURL({dynamic : true}))
        .setDescription('Kayıt edilecek kullanıcıyı etiketlemelisin'))
        .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true}))

        member.roles.remove(config.erkekrol)
        member.roles.remove(config.kadın)
        member.roles.add(config.kayıtsızrol)

        const embed1 = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`Kayıtsıza Atıldı!`, guild.iconURL({dynamic : true}))
        .setDescription(`> ${member} Başarıyla ${config.kayıtsızrol} rolüne atıldı.`)
        .setThumbnail(kullanici.displayAvatarURL({dynamic : true}))
        .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true}))
        .setTimestamp()
      message.channel.send(embed1)

      const embed2 = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setAuthor(`Kayıtsıza Atıldı!`, guild.iconURL({dynamic : true}))                                                                                                                            
      .setDescription(`> ${member} Adlı kullanıcı ${message.author} tarafından kayıtsıza attıldı!`)
      .setThumbnail(kullanici.displayAvatarURL({dynamic : true}))
      .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true}))
      .setTimestamp()
      client.channels.cache.get(config.kayıtlog).send(embed2)

    }
}