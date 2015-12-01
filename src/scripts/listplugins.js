var nwGui = require('nw.gui')
var walk = require('walk');
var files = [];

//Scan
var walker  = walk.walk('./src/scripts/plugins', { followLinks: false });
walker.on('file', function(root, stat, next) {
    listPluginE(stat.name)
    next();
});

var walker  = walk.walk('./src/scripts/disabledplugins', { followLinks: false });
walker.on('file', function(root, stat, next) {
    listPluginD(stat.name,"disabled")
    next();
});
	
function listPluginE(dir) {
	//Text
	var dir = arguments[0]
	var type = "enabled"
	var para = document.createElement("p");
	var t = document.createTextNode(dir);
	para.className = type;
	para.appendChild(t);
	document.getElementById('enabledSpace').appendChild(para);
	//Disable
	var disable = document.createElement("button");
	var t = document.createTextNode("Disable");
	disable.className = "disable";
	disable.onclick = function() { disablePlugin(dir); }
	disable.appendChild(t);
	document.getElementById('enabledSpace').appendChild(disable);
	//Open
	var openb = document.createElement("button");
	var t = document.createTextNode("Edit");
	openb.className = "open";
	openb.onclick = function() { openE(dir); };
	openb.appendChild(t);
	document.getElementById('enabledSpace').appendChild(openb);
	//Delete
	var delButton = document.createElement("button");
	var t = document.createTextNode("Delete");
	delButton.className = "del";
	delButton.onclick = function() { delPluginD(dir); }
	delButton.appendChild(t);
	document.getElementById('enabledSpace').appendChild(delButton);
	}
	
function listPluginD(dir) {
	//Text
	var dir = arguments[0]
	var type = "disabled"
	var para = document.createElement("p");
	var t = document.createTextNode(dir);
	para.className = type;
	para.appendChild(t);
	document.getElementById('disabledSpace').appendChild(para);
	//Enable
	var enable = document.createElement("button");
	var t = document.createTextNode("Enable");
	enable.className = "enable";
	enable.onclick = function() { enablePlugin(dir); };
	enable.appendChild(t);
	document.getElementById('disabledSpace').appendChild(enable);
	//Open
	var openb = document.createElement("button");
	var t = document.createTextNode("Edit");
	openb.className = "open";
	openb.onclick = function() { openD(dir); };
	openb.appendChild(t);
	document.getElementById('disabledSpace').appendChild(openb);
	//Delete
	var delButton = document.createElement("button");
	var t = document.createTextNode("Delete");
	delButton.className = "del";
	delButton.onclick = function() { delPluginE(dir); }
	delButton.appendChild(t);
	document.getElementById('disabledSpace').appendChild(delButton);
	}


function enablePlugin(name) {
	name = arguments[0]
	fs.rename("./src/scripts/disabledplugins/" + name,"./src/scripts/plugins/" + name)
	location.reload();
}
function disablePlugin(name) {
	name = arguments[0]
	fs.rename("./src/scripts/plugins/" + name,"./src/scripts/disabledplugins/" + name)
	location.reload();
}
function openE(name) {
	name = arguments[0]
	window.location.replace("editor.html#" + "plugins/" + name);
}
function openD(name) {
	name = arguments[0]
	window.location.replace("editor.html#" + "disabledplugins/" + name);
}
function delPluginE(name) {
	name = arguments[0]
	fs.unlink("./src/scripts/disabledplugins/" + name)
	location.reload();
}
function delPluginD(name) {
	name = arguments[0]
	fs.unlink("./src/scripts/plugins/" + name)
	location.reload();
}