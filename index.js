const bedrock = require('bedrock-protocol');

const CONFIG = {
  host: 'YOUR_SERVER_IP',  // YAHAN IP DAALO
  port: 19132,
  username: 'AFKBot_24_7',
  version: 'YOUR_VERSION', // YAHAN VERSION DAALO
};

let client = null;
let moveInterval = null;

function createBot() {
  console.log('[+] Connecting...');
  client = bedrock.createClient({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    offline: true,
    version: CONFIG.version,
  });
  client.on('join', () => { console.log('[✅] Bot joined!'); startMoving(); });
  client.on('close', () => { console.log('[❌] Disconnected.'); stopMoving(); setTimeout(createBot, 15000); });
  client.on('error', (err) => { console.log('[⚠️] Error:', err.message); });
}
function startMoving() {
  moveInterval = setInterval(() => {
    if (!client || !client.connected) return;
    const dirs = [{x:0.5,z:0},{x:-0.5,z:0},{x:0,z:0.5},{x:0,z:-0.5}];
    const dir = dirs[Math.floor(Math.random()*dirs.length)];
    client.queue('move_player',{position:{x:dir.x,y:0,z:dir.z}});
    client.queue('move_player',{pitch:Math.floor(Math.random()*360),yaw:Math.floor(Math.random()*360)});
  }, 12000);
}
function stopMoving() { if(moveInterval){clearInterval(moveInterval);moveInterval=null;} }
process.on('uncaughtException',(err)=>{console.log('[💥] Crash:',err.message);if(client){try{client.disconnect();}catch(e){}}setTimeout(createBot,15000);});
console.log('🎮 Bot Starting...');
createBot();
