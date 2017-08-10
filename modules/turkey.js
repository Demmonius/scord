const bot = require('../app.js').bot;

let enabled = false;
let id = 0;

const callback = (msg) => {
  if (msg.channel.id === id)
    msg.react('🦃').then().catch(console.error);
}

module.exports = {
  cmd: 'turkey',
  help: 'Enable / disable turkey mode',

  run: (msg, args) => {
    id = args[0] || 0;
    if (!enabled) {
      bot.on('message', callback);
      enabled = true;
    }
    else {
      bot.removeListener('message', callback);
      enabled = false;
    }
    msg.edit(`State: ${enabled ? 'enabled' : 'disabled'}`)
      .then(() => {
        setTimeout(() => {
          msg.delete().then().catch(console.error);
        }, 500);
      })
      .catch(console.error);
  }
};