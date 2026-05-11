
var count = true;
function f(){
if(count == true){
    var menu = document.getElementById("menu");
    menu.style.transform = "rotate(0deg)";
      var cm = document.getElementById("cm");
    cm.style.background = "#111";
    var out1 = document.getElementById("out1");
    out1.style.transform = "rotate(45deg)";
    var out2 = document.getElementById("out2");
    out2.style.transform = "rotate(-45deg)";
    var i1 = document.getElementById("i1");
    i1.style.width = "30px";
    var i2 = document.getElementById("i2");
    i2.style.width = "30px";
    var mid = document.getElementById("mid");
    mid.style.transform = "scale(0)";
    count = false;
    }else if(count == false){
        var menu = document.getElementById("menu");
    menu.style.transform = "rotate(-90deg)";
    var cm = document.getElementById("cm");
    cm.style.background = "#0000";
    var out1 = document.getElementById("out1");
    out1.style.transform = "rotate(0deg)";
    var out2 = document.getElementById("out2");
    out2.style.transform = "rotate(0deg)";
    var i1 = document.getElementById("i1");
    i1.style.width = "22px";
    var i2 = document.getElementById("i2");
    i2.style.width = "22px";
    var mid = document.getElementById("mid");
    mid.style.transform = "scale(1)";
    count = true;
    }
}
window.onload = function(){
    var coo = document.getElementById("coo");
    coo.style.color = "#fff";
    var cs = document.getElementById("cs");
    cs.style.color = "#fff";
}
