const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'PixelowyMc.aternos.me', 
  port: 14728,                   
  username: 'kuba21',  // Zmień na swój nick bota
  version: '1.21.11'              // Zmień na wersję serwera
});

bot.once('spawn', () => {
  setTimeout(() => {
    bot.chat('/login haslo123'); // Zmień na swoje hasło
  }, 3000);
});

bot.on('end', () => {
  setTimeout(() => process.exit(1), 5000);
});
