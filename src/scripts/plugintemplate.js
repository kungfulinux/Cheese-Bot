module.exports.inject = inject;
function inject(bot) {

//Your code goes here.

//Fake console
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
fakeConsole("Started your plugin.", "info")
}