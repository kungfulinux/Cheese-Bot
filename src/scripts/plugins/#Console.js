module.exports.inject = inject;
////Do not delete/edit this plugin! This logs chat to the console!

function inject(bot) {
////Log
	bot.on('chat', function(username, message) {
		fakeConsole(username + ": " + message,"chat")
	});
	bot.on('whisper', function(username, message) {
		if (username != bot.username) {
			fakeConsole(username + " whispers to you: " + message,"message")
		}
	});
	bot.on('login', function() {
        console.log('Connected');
		fakeConsole("Connected to server.","info")
    });
	bot.on('kicked', function(reason) {
        console.log('Kicked:', reason);
		fakeConsole("Kicked from server. Reason: " + reason,"error")
    });
	bot.on('death', function() {
		console.log("Died")
		fakeConsole("Died","error")
	});
	bot.on('end', function() {
		console.log("Disconnected")
		fakeConsole("Disconnected from the server.","error")
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
}