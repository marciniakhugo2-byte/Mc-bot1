const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'PixelowyMc.aternos.me', 
  port: 14728,                   
  username: 'kuba21',            
  version: '1.21.1',             // Spróbuj wpisać '1.21.1' zamiast 1.21.11 (często wersje silnika Paper różnią się w zapisie)
  auth: 'offline',
  hideErrors: false
});

bot.on('chat', (username, message) => {
  if (message.includes('register') || message.includes('zarejestruj')) {
    bot.chat('/register haslo123 haslo123');
  }
  if (message.includes('login') || message.includes('zaloguj')) {
    bot.chat('/login haslo123');
  }
});

bot.once('spawn', () => {
  console.log('Bot pomyślnie wszedł na serwer!');
});

bot.on('kicked', (reason) => {
  console.log('Wyrzucono przez serwer:', reason);
});

bot.on('end', () => {
  console.log('Rozłączono. Ponowna próba za 10 sekund...');
  setTimeout(() => process.exit(1), 10000);
});
