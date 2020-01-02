var gamepad;
var start;
var axeslength;
var buttonlength;

function innerHtml(id) {
    return document.getElementById(id).innerHTML;
}

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad Connected", e.gamepad);
    controllerConnect();
});

window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad Disconnected", e.gamepad);
    controllerDisconnect();
});


function controllerConnect() {
    var gps = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gps) { return; }
    gamepad = gps[0];
    axeslength = gamepad.axes.length;
    buttonlength = gamepad.buttons.length;
    document.getElementById("controllerconnected").innerHTML = "Controller is Connected!";
    document.getElementById("controllername").innerHTML = "Name:\n" + gamepad.id;  
    document.getElementById("controllerport").innerHTML = "Port: " + gamepad.index;
    drawButtonTable();
    controllerUpdate()
}

function controllerUpdate() {
    var gps = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gps) { return; }
    gamepad = gps[0];
    updateButtonTable();
    start = requestAnimationFrame(controllerUpdate);
}

function controllerDisconnect() {
    innerHtml("controllername") = "Name: ";
    innerHtml("controllerconnected") = "Controller is Not Connected.";
    innerHtml("controllerport") = "Port: ";
}

function drawButtonTable() {
    var buttondata = document.getElementById("buttondata");
    var axesdata = document.getElementById("axesdata");
    
    //dynamically allocate every element an id on creation so i can update the button table
    for (i = 0; i < axeslength; i++) { // number of axes
        var containerdiv = document.createElement("div");
        containerdiv.style.height = 83/axeslength + "%";
        containerdiv.style.border= "1px solid";
        var namediv = document.createElement("div");
        namediv.id="axes " + i;
        namediv.style.float = "left";
        namediv.style.width = "50%";
        var namedivcontent = document.createTextNode(namediv.id);
        namediv.appendChild(namedivcontent);

        var valuediv = document.createElement("div");
        valuediv.id="axesvalue " + i;
        valuediv.style.float = "right";
        valuediv.style.width = "50%";
        var valuedivcontent = document.createTextNode(gamepad.axes[i]);
        valuediv.appendChild(valuedivcontent);

        containerdiv.appendChild(namediv);
        containerdiv.appendChild(valuediv);
        axesdata.appendChild(containerdiv);
    }

    for (i = 0; i < buttonlength; i++) {
        var containerdiv = document.createElement("div");
        containerdiv.style.height = 83/buttonlength + "%";
        containerdiv.style.border= "1px solid";
        var namediv = document.createElement("div");
        namediv.id="button " + i;
        namediv.style.float = "left";
        namediv.style.width = "50%";
        var namedivcontent = document.createTextNode(namediv.id);
        namediv.appendChild(namedivcontent);

        var valuediv = document.createElement("div");
        valuediv.id="buttonvalue " + i;
        valuediv.style.float = "right";
        valuediv.style.width = "50%";
        var valuedivcontent = document.createTextNode(gamepad.buttons[i].value);
        valuediv.appendChild(valuedivcontent);

        containerdiv.appendChild(namediv);
        containerdiv.appendChild(valuediv);
        buttondata.appendChild(containerdiv);
    }
}

function updateButtonTable() {
    for (i = 0; i < axeslength; i++) { // number of axes
        var axes = document.getElementById("axesvalue " + i);
        axes.innerHTML = gamepad.axes[i];
    }

    for (i = 0; i < buttonlength; i++) { // number of buttons
        var button = document.getElementById("buttonvalue " + i);
        button.innerHTML = gamepad.buttons[i].value;
    }
}
