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

    // Update DOM on a Received Event
};

function onSuccess (acceleration) {
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;

    degreX = 180 / Math.PI * (Math.acos(acceleration.x/9.81));
    degreY = 180 / Math.PI * (Math.acos(acceleration.y/9.81));
    degreZ = 180 / Math.PI * (Math.acos(acceleration.z/9.81));

    document.getElementById("x").innerHTML = degreX;
    document.getElementById("y").innerHTML = degreY;
    document.getElementById("z").innerHTML = degreZ;
}
 
function onError () {
   alert('onError!');
}

app.initialize();