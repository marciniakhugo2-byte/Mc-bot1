const mineflayer = require('mineflayer');
const http = require('http');

// Prosty serwer HTTP, żeby Render był zadowolony z portu
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot dziala!\n');
});
server.listen(process.env.PORT || 3000);

const bot = mineflayer.createBot({
  host: 'PixelowyMc.aternos.me', 
  port: 14728,                   
  username: 'kuba21',            
  version: '1.21.11',            
  auth: 'offline'
});

bot.once('spawn', () => {
  console.log('Bot pomyślnie wszedł na serwer!');

  // Automatyczna rejestracja i logowanie zaraz po wejściu
  setTimeout(() => {
    bot.chat('/register haslo123 haslo123'); // Zmień haslo123 na swoje
    console.log('Wysłano komendę /register');
  }, 2000); // Czeka 2 sekundy po wejściu

  setTimeout(() => {
    bot.chat('/login haslo123'); // Zmień haslo123 na swoje
    console.log('Wysłano komendę /login');
  }, 4000); // Czeka 4 sekundy po wejściu

  // Anty-AFK: co 2 minuty bot obraca głowę, żeby Aternos go nie wyrzucił
  setInterval(() => {
    bot.look(bot.entity.yaw + 1.5, 0);
  }, 120000);
});

bot.on('chat', (username, message) => {
  if (message.includes('register') || message.includes('zarejestruj')) {
    bot.chat('/register haslo123 haslo123');
  }
  if (message.includes('login') || message.includes('zaloguj')) {
    bot.chat('/login haslo123');
  }
});

bot.on('kicked', (reason) => {
  console.log('Wyrzucono przez serwer:', reason);
});

bot.on('end', () => {
  console.log('Rozłączono. Ponowna próba za 10 sekund...');
  setTimeout(() => process.exit(1), 10000);
});
