module.exports.inject = inject;
var mineflayer = require('mineflayer');

function inject(bot) {
  ////Variables
  var follow = false
  var foloutId = undefined
  var attoutId = undefined

  ////Functions
  function followTarget() {
    var path = bot.navigate.findPathSync(global.target.position, {
      timeout: 999,
      endRadius: 1,
    });
    bot.navigate.walk(path.path)
  }
  function attackTarget() {
    bot.attack(global.target)
  }

////Commands
  bot.on('whisper', function(username, message) {
    if(username === bot.username) return;
      if (message.startsWith('goto ')) {
        clearInterval(foloutId)
        clearInterval(attoutId)
        var l_m = message
        var nav_player = l_m.substring(5)
        var target = bot.players[nav_player.trim()].entity;
        console.log("Navigating to " + target.position +".")
        console.log("Calculating...")
        bot.navigate.to(target.position);
          console.log("On my way!")
        }
      if (message == "come") {
        clearInterval(foloutId)
        clearInterval(attoutId)
        var target = bot.players[username].entity;
        if (target != null) {
        bot.navigate.to(target.position);
        fakeConsole("Started navigating to " + username,"info")
      } else {
        fakeConsole("Could not find player.","error")
      }
  }
  if (message == "follow" && follow === false) {
    follow = true
    clearInterval(foloutId)
    clearInterval(attoutId)
    global.target = bot.players[username].entity;
    if (global.target != null) {
      foloutId = setInterval(followTarget, 1000);
      fakeConsole("Started following " + username,"info")
    } else {
      fakeConsole("Could not find player.","error")
    }
  }
  if (message == "stop") {
    bot.navigate.stop()
    if (follow === true) {
      follow = false
      clearInterval(foloutId)
      clearInterval(attoutId)
      fakeConsole("Stopping task.","info")
    }
  }
  if (message.startsWith('attack ')) {
    var plnam = (message.substring(7)).trim()
    var attacktarg = bot.players[plnam].entity;
    if (attacktarg != null) {
      bot.attack(attacktarg)
      fakeConsole("Attacking " + plnam,"info")
    } else {
      fakeConsole("Could not find player.","error")
    }
  }
  if (message.startsWith('kill ') && follow === false) {
    follow = true
    var plnam = (message.substring(5)).trim()
    global.target = bot.players[plnam].entity;
    if (global.target != null) {
      foloutId = setInterval(followTarget, 1000);
      attoutId = setInterval(attackTarget, 500);
      fakeConsole("Attempting to kill " + plnam,"info")
    } else {
    fakeConsole("Could not find player.","error")
    }
  }
  if (message.startsWith('follow ') && follow === false) {
    follow = true
      var plnam = (message.substring(7)).trim()
      global.target = bot.players[plnam].entity;
      if (global.target != null) {
      foloutId = setInterval(followTarget, 1000);
      fakeConsole("Started following " + plnam,"info")
      } else {
        fakeConsole("Could not find player.","error")
      }
    }
  });

  ////Feedback
  bot.navigate.on('cannotFind', function (closestPath) {
    fakeConsole("Cannot find a path. Getting as close as possible.","error")
    bot.navigate.walk(closestPath);
  });
  bot.navigate.on('arrived', function () {
    fakeConsole("Arrived at the destination.","info")
  });
  bot.navigate.on('interrupted', function() {
    fakeConsole("Task has been interrupted.","error")
  });
  bot.on('death', function() {
    fakeConsole("Ending any navigation...","error")
    clearInterval(foloutId)
    clearInterval(attoutId)
    bot.navigate.stop();
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
  fakeConsole("Started navigation and combat plugin.","info")
}
