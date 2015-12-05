function saveToFile() {
  var fs = require('fs');

  var ip_element = document.getElementById("ip").value
  var port_element = document.getElementById("port").value
  var name_element = document.getElementById("username").value
  var pass_element = document.getElementById("password").value

  if (document.getElementById('save').checked) {
    savestring = name_element + "|" + pass_element + "|" + ip_element + "|" + port_element + "|" + "1"
  } else {
    savestring = name_element + "|" + pass_element + "|" + ip_element + "|" + port_element + "|" + "0"
  }

  if (!window.name.startsWith("tempdat")) {window.name = "tempdat" + makeid() + ".txt"}
  fs.writeFile("./src/userdata/" + window.name, savestring, function(err) {
    if(err) {
      return console.log(err);
      }
  });
	
  if (document.getElementById('save').checked) {
    savestring = name_element + "|" + pass_element + "|" + ip_element + "|" + port_element + "|" + "1"
    fs.writeFile("./src/userdata/settings.txt", savestring, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  } else {
    savestring = "||||" + "0"
      fs.writeFile("./src/userdata/settings.txt", savestring, function(err) {
            if(err) {
            return console.log(err);
        }
    });
  }
}

function makeid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}