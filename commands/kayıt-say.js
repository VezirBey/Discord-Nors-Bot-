const Discord = require('discord.js');
const db = require('quick.db')

module.exports = { 
    kod: "kayıt-say",
    async run(client, message, args) {

        const config = require('../config.json')

  if(!message.member.roles.cache.has(config.kayıtrolü)) 
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);

  let guild = message.channel.guild

  const erkeksayısı = await db.fetch(`erkeksayısı.${message.author.id}`) || '0'
  const kızsayısı = await db.fetch(`kızsayısı.${message.author.id}`) || '0'

  const kayıtlılar = new Discord.MessageEmbed()
      .setColor('#00ffe3')
      .setAuthor(`Kayıt Say!`, guild.iconURL({dynamic : true}))
      .setDescription([`**${message.author.username} Adlı yetkilinin kayıt sayısı**\n\n`,       
      '> Toplam \`'+ erkeksayısı +'\` tane erkek üye kayıt ettiniz.\n',
      '> Toplam \`'+ kızsayısı +'\` tane kadın üye kayıt ettiniz.'])
      .setFooter(`Zelaxin Kayıt Sistemi`, message.author.avatarURL({dynamic : true}))
    message.channel.send(kayıtlılar)

}
}