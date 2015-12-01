module.exports.inject = inject;

function inject(bot) {

////No syntax
bot.on('whisper', function(username, message) {
  switch(message) {
	  
    case 'quit':
	  bot.quit()
      break;
	case 'reset':
	  fakeConsole("Restarting...","info")
   	  bot.quit()
	  window.location.reload(1)
	  location.reload()
	  window.location.reload(1)
	  location.reload()
      break;
	case 'restart':
	  fakeConsole("Restarting...","info")
   	  bot.quit()
	  window.location.reload(1)
	  location.reload()
	  window.location.reload(1)
	  location.reload()
      break;
	case 'master':
	  bot.chat(GLOBAL.master + " is currently controlling me.")
      break;
    case 'pos':
      bot.chat("/msg " + username + " I am at " + bot.entity.position)
      break;
    case 'tp':
      bot.chat("/tp " + username)
	  console.log("Teleporting to " + username)
      break;
    case 'tpa':
      bot.chat("/tpa " + username)
	  console.log("Sending teleport request to " + username)
      break;
    case 'health':
      bot.chat("/msg " + username + " I am at " + bot.health + "/20 health.")
      break;
    case 'hunger':
      bot.chat("/msg " + username + " I am at " + bot.food + "/20 hunger.")
      break;
    case 'time':
      bot.chat("/msg " + username + " It is " + bot.time.day + "/24000.")
      break;
    case 'log':
      fakeConsole("Hello world!","info")
      break;
	  
  }
});

////Multiple syntax
bot.on('whisper', function(username, message) {
  if(username === bot.username) return;
  
  if (message.startsWith('say ')) {
	  bot.chat(message.substring(4))
	}
	
});

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

fakeConsole("Basic commands plugin started.","info")
	
}