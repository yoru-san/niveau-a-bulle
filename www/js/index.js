var app = {
    // Application Constructor
    initialize: function() {
        if(window.cordova)
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    else 
        this.onDeviceReady();
    },

    // deviceready Event Handler
    onDeviceReady: function() {
    var options = { frequency: 1000 };  // Update every 1 seconds
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    },
};

var lastX;
var lastY;
var denoiserRatio = 10;
function onSuccess (acceleration) {

    //degreZ = 180 / Math.PI * (Math.acos(acceleration.z/9.81));

    degreX = 180 / Math.PI * (Math.acos(acceleration.x/9.81));
    degreY = 180 / Math.PI * (Math.acos(acceleration.y/9.81));

    if (!lastX) {
        //console.log("Premiere valeur X: " + degreX);
        document.getElementById("x").innerHTML = degreX;
        lastX = degreX;
    } else {
        differenceX = Math.abs(degreX - lastX);
        //console.log("----------------------------------");
        //console.log("Nouvelle valeur X: " + degreX);
        //console.log("Ancienne valeur X: " + lastX);
        //console.log("Différence: " + differenceX);
        if (differenceX > denoiserRatio) {
            //console.log("Modifier la valeur");
            document.getElementById("x").innerHTML = degreX;
            lastX = degreX;
        }
    }

    if (!lastY) {
        document.getElementById("y").innerHTML = degreY;
        lastY = degreX;
    } else {
        differenceY = Math.abs(degreY - lastY);  
        if (differenceY > denoiserRatio) {
            document.getElementById("y").innerHTML = degreY;
            lastY = degreY;
        }    
    }
}
 
function onError () {
   alert('onError!');
}

app.initialize();