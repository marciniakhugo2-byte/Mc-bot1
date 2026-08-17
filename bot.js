const mineflayer = require('mineflayer');
const http = require('http');

// ==========================================
// 1. SERWER HTTP DLA RENDER.COM
// Utrzymuje usługę w stanie "Live"
// ==========================================
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Minecraft dziala 24/7!\n');
});

server.listen(PORT, () => {
  console.log(`[HTTP] Serwer www wystartowal na porcie ${PORT}`);
});

// ==========================================
// 2. KONFIGURACJA BOTA
// ==========================================
const CONFIG = {
  host: 'PixelowyMc.aternos.me', // Adres Twojego serwera
  port: 14728,                   // Port z Aternosa
  username: 'kuba21',            // Nick bota
  auth: 'offline',               // Tryb Non-Premium
  password: 'haslo123'           // Twoje hasło na serwerze
};

let bot = null;

function startBot() {
  console.log('[BOT] Proba polaczenia z serwerem Minecraft...');

  bot = mineflayer.createBot({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    auth: CONFIG.auth,
    checkTimeoutInterval: 60 * 1000
  });

  // KIEDY BOT WEJDZIE NA SERWER
  bot.once('spawn', () => {
    console.log('--------------------------------------------------');
    console.log('[BOT SUCCESS] Bot pomyślnie wszedł na serwer!');
    console.log('--------------------------------------------------');

    // Automatyczna rejestracja i logowanie po wejściu
    setTimeout(() => {
      bot.chat(`/register ${CONFIG.password} ${CONFIG.password}`);
      bot.chat(`/login ${CONFIG.password}`);
      console.log('[BOT] Wyslano komendy /register i /login');
    }, 3000);

    // ANTY-AFK (podskok i rozglądanie się co 45 sekund)
    setInterval(() => {
      if (bot && bot.entity) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 400);
        bot.look(bot.entity.yaw + 0.8, 0);
      }
    }, 45000);
  });

  // LOGOWANIE GDY SERWER POPROSI NA CZACIE
  bot.on('chat', (username, message) => {
    const msg = message.toLowerCase();
    if (msg.includes('register') || msg.includes('zarejestruj')) {
      bot.chat(`/register ${CONFIG.password} ${CONFIG.password}`);
    }
    if (msg.includes('login') || msg.includes('zaloguj')) {
      bot.chat(`/login ${CONFIG.password}`);
    }
  });

  // OBSŁUGA BŁĘDÓW I ROZŁĄCZEŃ
  bot.on('error', (err) => {
    console.log('[BOT ERROR]', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('[BOT KICKED] Wyrzucono z powodu:', reason);
  });

  bot.on('end', () => {
    console.log('[BOT DISCONNECTED] Rozlaczono! Ponowna proba polaczenia za 15 sekund...');
    setTimeout(startBot, 15000);
  });
}

// Uruchomienie bota
startBot();
      

