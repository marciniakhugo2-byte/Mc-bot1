const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'PixelowyMc.aternos.me', 
  port: 14728,                   
  username: 'kuba21',            
  version: '1.21.11',            // Dokładna wersja z Twojego panelu Aternos
  auth: 'offline'                // Wymagane dla serwerów non-premium / PaperMC
});

bot.on('chat', (username, message) => {
  if (message.includes('register') || message.includes('zarejestruj')) {
    bot.chat('/register haslo123 haslo123');
    console.log('Wysłano komendę rejestracji!');
  }
  
  if (message.includes('login') || message.includes('zaloguj')) {
    bot.chat('/login haslo123');
    console.log('Wysłano komendę logowania!');
  }
});

bot.once('spawn', () => {
  console.log('Bot pomyślnie wszedł na serwer!');
});

bot.on('kicked', (reason) => {
  console.log('Bot został wyrzucony z powodu: ', reason);
});

bot.on('end', () => {
  console.log('Rozłączono. Ponowne łączenie za 5 sekund...');
  setTimeout(() => process.exit(1), 5000);
});


