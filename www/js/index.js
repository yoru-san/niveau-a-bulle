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
//Définition de notre ratio de comparaison des valeurs
var denoiserRatio = 10;
function onSuccess (acceleration) {

    //degreZ = 180 / Math.PI * (Math.acos(acceleration.z/9.81));

    degreX = 180 / Math.PI * (Math.acos(acceleration.x/9.81));
    degreY = 180 / Math.PI * (Math.acos(acceleration.y/9.81));

    // Si l'ancienne valeur de x n'est pas défini, on l'affiche de suite dans le navigateur puis on la stocke en tant qu'ancienne valeur.
    if (!lastX) {
        document.getElementById("x").innerHTML = degreX;
        lastX = degreX;
    } else {
        // Si l'ancienne valeur de x est défini, on compare les 2 valeurs de x pour garder la différence (on utilise la valeur absolue Math.abs pour éviter d'avoir une différence négative).
        //Si cette différence est supérieure à 1, on affiche la nouvelle valeur de x et on la stocke en tant qu'ancienne valeur.
        differenceX = Math.abs(degreX - lastX);
        if (differenceX > denoiserRatio) {
            document.getElementById("x").innerHTML = degreX;
            lastX = degreX;
        }
    }

    // Si l'ancienne valeur de y n'est pas défini, on l'affiche de suite dans le navigateur puis on la stocke en tant qu'ancienne valeur.
    if (!lastY) {
        document.getElementById("y").innerHTML = degreY;
        lastY = degreX;
    } else {
        // Si l'ancienne valeur de y est défini, on compare les 2 valeurs de y pour garder la différence (on utilise la valeur absolue Math.abs pour éviter d'avoir une différence négative).
        //Si cette différence est supérieure à 1, on affiche la nouvelle valeur de y et on la stocke en tant qu'ancienne valeur.
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