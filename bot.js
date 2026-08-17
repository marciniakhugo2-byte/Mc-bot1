const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'PixelowyMc.aternos.me', 
  port: 14728,                   
  username: 'kuba21',            // Twój nick bota
  version: '1.21.11'             // Twoja wersja serwera
});

bot.on('chat', (username, message) => {
  // Jeśli serwer prosi o rejestrację
  if (message.includes('register') || message.includes('zarejestruj')) {
    bot.chat('/register haslo123 haslo123'); // Zmień na swoje hasło
    console.log('Wysłano komendę rejestracji!');
  }
  
  // Jeśli serwer prosi o logowanie
  if (message.includes('login') || message.includes('zaloguj')) {
    bot.chat('/login haslo123'); // Zmień na swoje hasło
    console.log('Wysłano komendę logowania!');
  }
});

bot.once('spawn', () => {
  console.log('Bot dołączył do świata. Oczekiwanie na komunikat o logowaniu...');
});

bot.on('end', () => {
  console.log('Rozłączono. Ponowne łączenie za 5 sekund...');
  setTimeout(() => process.exit(1), 5000);
});

