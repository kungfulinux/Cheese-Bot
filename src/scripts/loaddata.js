var fs  = require("fs");

var loginDataTemp = fs.readFileSync("./src/userdata/settings.txt").toString();
var loginData = loginDataTemp.split("|");
if (loginData[4] == "1") {
  document.getElementById('username').value=loginData[0]
  document.getElementById('password').value=loginData[1]
  document.getElementById('ip').value=loginData[2]
  document.getElementById('port').value=loginData[3]
  document.getElementById("save").checked = true
}

if (window.name.startsWith("tempdat")) {
if (fs.existsSync("./src/userdata/" + window.name)) { 
  loginDataTemp = fs.readFileSync("./src/userdata/" + window.name).toString();
  loginData = loginDataTemp.split("|");
  document.getElementById('username').value=loginData[0]
  document.getElementById('password').value=loginData[1]
  document.getElementById('ip').value=loginData[2]
  document.getElementById('port').value=loginData[3]
  if (loginData[4] == "0") {
    document.getElementById("save").checked = false
  } else {
    document.getElementById("save").checked = true
  }
}
}