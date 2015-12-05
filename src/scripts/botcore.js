////Start libraries
fakeConsole("The one and only official download for Cheese Bot is on http:///bot.minecheesecraft.com", "info")
var fs  = require("fs");
var mineflayer = require('mineflayer');
var mcData=require("minecraft-data")("1.8.8")
var navigatePlugin = require('mineflayer-navigate')(mineflayer);
var scaffoldPlugin = require('mineflayer-scaffold')(mineflayer);
var blockFinderPlugin = require('mineflayer-blockfinder')(mineflayer);
var vec3 = mineflayer.vec3;
var requireIndex = require('requireindex');
var path = require('path')

////Loading data
var loginDataTemp = fs.readFileSync("./src/userdata/" + window.name).toString();
var loginData = loginDataTemp.split("|");
if ( loginData[2] == "" ) { loginData[2] = "127.0.0.1" }
if ( loginData[3] == "" ) { loginData[3] = "25565" }
if ( loginData[1] == "" ) { loginData[1] = undefined }

////Create Bot
var bot = mineflayer.createBot({
  host: loginData[2], // 127.0.0.1
  port: Number(loginData[3]),       // 25565
  username: loginData[0], // email and password are required only for
  password: loginData[1],          // online-mode=true servers
  verbose: true,
});

////Start Libraries
navigatePlugin(bot);
scaffoldPlugin(bot);
blockFinderPlugin(bot);
////Optional Configurations
bot.navigate.blocksToAvoid[132] = true; //avoid tripwire
bot.navigate.blocksToAvoid[59] = true; //avoid crops
bot.navigate.blocksToAvoid[81] = true; //avoid cactus
bot.navigate.blocksToAvoid[85] = true; //avoid fence
bot.navigate.blocksToAvoid[139] = true; //avoid cobblestone wall
bot.navigate.blocksToAvoid[78] = true; //avoid snow

////Add essentials whisper pattern
bot.chatAddPattern(/^\[.*?(\w*) -> me \] (.*)$/, "whisper", "essentials whisper");
bot.chatAddPattern(/^\[.*\] ?([^\]:]*) : (.*)$/, "chat", "pex chat");

////Fake console
function fakeConsole(text,type) {
  document = doc = window.document 
  var text = arguments[0]
  var type = arguments[1]
  var para = document.createElement("P");
  var t = document.createTextNode(text);
  para.className = type;
  para.appendChild(t);
  document.getElementById('Space').appendChild(para);
  window.scrollTo(0,document.body.scrollHeight);
	}

////Start Plugins
var plugins = requireIndex('./src/scripts/plugins');
  for (plugin in plugins) {
    if (plugins[plugin].inject != null) {
      plugins[plugin].inject(bot);
    } else {
      console.log(plugin, 'has no inject function.');
      fakeConsole(plugin + " has no inject function.","error")
    }
}
	
window.onbeforeunload = function(event) {
  bot.quit()
}
