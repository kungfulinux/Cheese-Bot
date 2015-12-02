module.exports.inject = inject;
////Do not delete/edit this plugin! This logs chat to the console!

function inject(bot) {
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
  fakeConsole("Cheese Bot was created by Minecheesecraft. Cheese Bot also uses code from Andrew Kelley, Casey Kuball, and everyone who made PrismarineJS, Node.js, and Node-Webkit. Logo image made by Voxelizer.","info")
}
