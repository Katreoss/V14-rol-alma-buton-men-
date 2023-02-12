const { Client, Partials, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');

const info = require("./info.json")

const client = new Client({ fetchAllMembers : true , 
intents: [GatewayIntentBits.Guilds,
 GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
   GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
     GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
       GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
         GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildMessageTyping,
           GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
             GatewayIntentBits.DirectMessageTyping,
              GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});

              client.commands = new Collection();
              client.aliases = new Collection();
              client.events = new Collection();

              const eventsPath = path.join(__dirname, 'events');
              const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
              
              
              
              for (const file of eventFiles) {
                  const filePath = path.join(eventsPath, file);
                  const event = require(filePath);
                  if (event.once) {
                      client.once(event.name, (...args) => event.execute(...args));
                  } else {
                      client.on(event.name, (...args) => event.execute(...args));
                  }
                    console.log(`[EVENT] ${event.name} yüklendi`)
              }

const commands = fs.readdirSync("./komut").filter(file => file.endsWith(".js"))
for(file of commands) {
const commandName = file.split(".")[0]
const command = require(`./komut/${commandName}`)
client.commands.set(commandName, command)
console.log(`[KOMUT] ${commandName} yüklendi`)
}
const prefix = `${info.roleprefix}`
client.on('messageCreate', async (message) => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName) || client.commands.find(u => u.use && u.use.includes(commandName));
        if(!command) return
        command.run(client, message, args)
    }
})

client.on(Events.InteractionCreate, async (interaction) => {
    if(interaction.isButton()) {

        if (interaction.customId === 'eck1') { 
           let çrolesvar = await interaction.member.roles.cache.get(info.katılım.roleçekilkatılım);
          if (!çrolesvar) {
    
         await interaction.member.roles.add(info.katılım.roleçekilkatılım);
         await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinize <@&${info.katılım.roleçekilkatılım}> rolü verildi.`, ephemeral: 'true' } )
          } else {
            
          interaction.member.roles.remove(info.katılım.roleçekilkatılım)
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinizden <@&${info.katılım.roleçekilkatılım}> rolü alındı.`, ephemeral: 'true' } )
          }
        }
        if (interaction.customId === 'eck2') {
            let erolesvar = await interaction.member.roles.cache.get(info.katılım.roleetkinkatılım);
            if (!erolesvar) {
                await interaction.member.roles.add(info.katılım.roleetkinkatılım);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinize <@&${info.katılım.roleetkinkatılım}> rolü verildi.`, ephemeral: 'true' } )
            } else {
                await interaction.member.roles.remove(info.katılım.roleetkinkatılım);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** Üyesi üzerinizden <@&${info.katılım.roleetkinkatılım}> rolü alındı.`, ephemeral: 'true' } )
            }
    
        }
    }
    if (interaction.isStringSelectMenu()) {
        const seçim = interaction.values[0];
    
        if (seçim === 'takım1') {
           let frol = await interaction.member.roles.cache.get(info.takım.fener)
            
          if(!frol) { 
            await interaction.member.roles.remove(info.takım.galat); 
            await interaction.member.roles.remove(info.takım.besik); 
            await interaction.member.roles.remove(info.takım.trabzon); 
            await interaction.member.roles.remove(info.takım.basak);     
            await interaction.member.roles.add(info.takım.fener);
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.fener}> rolünü ekledim`, ephemeral: true })
        } else {
            interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.fener}> rolüne zaten sahipsiniz.`, ephemeral: true })
        }}
        if (seçim === 'takım2') {
            let grol = await interaction.member.roles.cache.get(info.takım.galat)
                
              if(!grol) { 
                await interaction.member.roles.remove(info.takım.fener); 
                await interaction.member.roles.remove(info.takım.besik); 
                await interaction.member.roles.remove(info.takım.trabzon); 
                await interaction.member.roles.remove(info.takım.basak);  
                await interaction.member.roles.add(info.takım.galat);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.galat}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.galat}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }
    
        if (seçim === 'takım3') {
            let brol = await interaction.member.roles.cache.get(info.takım.besik)
                
              if(!brol) { 
                await interaction.member.roles.remove(info.takım.fener); 
                await interaction.member.roles.remove(info.takım.galat); 
                await interaction.member.roles.remove(info.takım.trabzon); 
                await interaction.member.roles.remove(info.takım.basak);  
                await interaction.member.roles.add(info.takım.besik);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.besik}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.besik}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }

        if (seçim === 'takım4') {
            let trol = await interaction.member.roles.cache.get(info.takım.trabzon)
                
              if(!trol) {
                await interaction.member.roles.remove(info.takım.fener); 
                await interaction.member.roles.remove(info.takım.galat); 
                await interaction.member.roles.remove(info.takım.besik); 
                await interaction.member.roles.remove(info.takım.basak);   
                await interaction.member.roles.add(info.takım.trabzon);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.trabzon}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.trabzon}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }

        if (seçim === 'takım5') {
            let mbrol = await interaction.member.roles.cache.get(info.takım.basak)
                
              if(!mbrol) { 
                await interaction.member.roles.remove(info.takım.fener); 
                await interaction.member.roles.remove(info.takım.galat); 
                await interaction.member.roles.remove(info.takım.besik); 
                await interaction.member.roles.remove(info.takım.trabzon);
                await interaction.member.roles.add(info.takım.basak);
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.takım.basak}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.takım.basak}> rolüne zaten sahipsiniz.`, ephemeral: true })
            }
        }

        if (seçim === 'takım6') {
            await interaction.member.roles.remove(info.takım.fener)
            await interaction.member.roles.remove(info.takım.galat)
            await interaction.member.roles.remove(info.takım.besik)
            await interaction.member.roles.remove(info.takım.trabzon)
            await interaction.member.roles.remove(info.takım.basak)
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **Takım** rolleriniz sıfırlandı`, ephemeral: true })
        }

        if (seçim === 'i1') {
            let i1var = interaction.member.roles.cache.get(info.ilişki.couple)
            if(!i1var) {
            await interaction.member.roles.remove(info.ilişki.alone)
            await interaction.member.roles.add(info.ilişki.couple)
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.ilişki.couple}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.ilişki.couple}> rolüne zaten sahipsiniz.`, ephemeral: true }) 
            }
        }

        if (seçim === 'i2') {
            let i2var = interaction.member.roles.cache.get(info.ilişki.alone)
            if(!i2var) {
            await interaction.member.roles.remove(info.ilişki.couple)
            await interaction.member.roles.add(info.ilişki.alone)
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi üzerinize <@&${info.ilişki.alone}> rolünü ekledim`, ephemeral: true })
            } else {
                await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi <@&${info.ilişki.alone}> rolüne zaten sahipsiniz.`, ephemeral: true }) 
            }
        }
        if (seçim === 'i3') {
            await interaction.member.roles.remove(info.ilişki.couple)
            await interaction.member.roles.remove(info.ilişki.alone)
            await interaction.reply({ content: `Sevgili **__${interaction.guild.name}__** üyesi **İlişki** rolleriniz sıfırlandı`, ephemeral: true })
        }
     

    }
})
client.login(info.roletoken)
