var screenWidth, screenHeight, bubbleWidth, bubbleHeight;

var app = {
    // Application Constructor
    initialize: function() {
        if(window.cordova) {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

            screenWidth  = $(window).width();
            screenHeight = $(window).height();
            bubbleWidth  = $("#bubble").outerWidth();
            bubbleHeight = $("#bubble").outerHeight();

            $("#vertical-line").css("left", screenWidth / 2 - 1);
            $("#horizontal-line").css("top", screenHeight / 2 - 1);
        } else 
            this.onDeviceReady();
    },

    // deviceready Event Handler
    onDeviceReady: function() {
    var options = { frequency: 10 };  // Update every 10 milliseconds
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    },
};

var lastX;
var lastY;
//Définition de notre ratio de comparaison des valeurs
var denoiserRatio = 2;
function onSuccess (acceleration) {

    //degreZ = 180 / Math.PI * (Math.acos(acceleration.z/9.81));

    degreX = 180 / Math.PI * (Math.acos(acceleration.x/9.81));
    degreY = 180 / Math.PI * (Math.acos(acceleration.y/9.81));

    // Si l'ancienne valeur de x n'est pas défini, on l'affiche de suite dans le navigateur puis on la stocke en tant qu'ancienne valeur.
    if (!lastX) {
        document.getElementById("x").innerHTML = "X : " + degreX;
        lastX = degreX;

        var right = lastX / 180 * screenWidth - (bubbleWidth / 2);
        $("#bubble").css("right", right + "px");
    } else {
        // Si l'ancienne valeur de x est défini, on compare les 2 valeurs de x pour garder la différence (on utilise la valeur absolue Math.abs pour éviter d'avoir une différence négative).
        //Si cette différence est supérieure à 1, on affiche la nouvelle valeur de x et on la stocke en tant qu'ancienne valeur.
        differenceX = Math.abs(degreX - lastX);
        if (differenceX > denoiserRatio) {
            document.getElementById("x").innerHTML = "X : " + degreX;;
            lastX = degreX;

            var right = lastX / 180 * screenWidth - (bubbleWidth / 2);
            $("#bubble").css("right", right + "px");
        }
    }

    // Si l'ancienne valeur de y n'est pas défini, on l'affiche de suite dans le navigateur puis on la stocke en tant qu'ancienne valeur.
    if (!lastY) {
        document.getElementById("y").innerHTML = "Y : " + degreY;
        lastY = degreY;

        var top = lastY / 180 * screenHeight - (bubbleHeight / 2);
        $("#bubble").css("top", top + "px");
    } else {
        // Si l'ancienne valeur de y est défini, on compare les 2 valeurs de y pour garder la différence (on utilise la valeur absolue Math.abs pour éviter d'avoir une différence négative).
        //Si cette différence est supérieure à 1, on affiche la nouvelle valeur de y et on la stocke en tant qu'ancienne valeur.
        differenceY = Math.abs(degreY - lastY);  
        if (differenceY > denoiserRatio) {
            document.getElementById("y").innerHTML = "Y : " + degreY;
            lastY = degreY;

            var top = lastY / 180 * screenHeight - (bubbleHeight / 2);
            $("#bubble").css("top", top + "px");
        }    
    }
}
 
function onError () {
   alert('onError!');
}

app.initialize();