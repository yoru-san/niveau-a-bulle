var screenWidth, screenHeight, bubbleWidth, bubbleHeight;

var app = {
    initialize: function() {
        if(window.cordova) {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            //Valeurs nécessaires à l'adaptation sur tout type de téléphone0
            screenWidth  = $(window).width();
            screenHeight = $(window).height();
            bubbleWidth  = $("#bubble").outerWidth(); // outerWidth & outerHeight prennent en considération les padding/border 
            bubbleHeight = $("#bubble").outerHeight(); //contrairement à width & height.

            //Placement des lignes de repérages selon le milieu de l'écran en enlevant 1px pour ajuster avec la largeur des lignes.
            $("#vertical-line").css("left", screenWidth / 2 - 1);
            $("#horizontal-line").css("top", screenHeight / 2 - 1);
        } else 
            this.onDeviceReady();
    },

    onDeviceReady: function() {
    var options = { frequency: 10 };  // Mise à jour toutes les 10 millisecondes.
    var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    },
};

var degreX;
var degreY;
var lastX;
var lastY;
var differenceX;
var differenceY;
//Définition de notre ratio de comparaison des valeurs.
var denoiserRatio = 2;

function onSuccess (acceleration) {

    //Conversion en degré des valeurs fournies par l'accéléromètre.
    degreX = 180 / Math.PI * (Math.acos(acceleration.x/9.81));
    degreY = 180 / Math.PI * (Math.acos(acceleration.y/9.81));

    // Si l'ancienne valeur de x n'est pas défini, on lance l'affichage.
    if (!lastX)
        showX();
    else {
        // Si l'ancienne valeur de x est défini, on compare les 2 valeurs de x pour garder la différence (on utilise la valeur absolue Math.abs pour éviter d'avoir une différence négative).
        //Si cette différence est supérieure à 1, on lance l'affichage.
        differenceX = Math.abs(degreX - lastX);
        if (differenceX > denoiserRatio)
            showX();
    }

    // Si l'ancienne valeur de y n'est pas défini, on lance l'affichage.
    if (!lastY) 
        showY();
    else
        // Si l'ancienne valeur de y est défini, on compare les 2 valeurs de y pour garder la différence (on utilise la valeur absolue Math.abs pour éviter d'avoir une différence négative).
        //Si cette différence est supérieure à 1, on lance l'affichage.
        differenceY = Math.abs(degreY - lastY);  
        if (differenceY > denoiserRatio)
           showY();   
}
 
function onError () {
   alert('onError!');
}

function showX () {
    //on affiche la nouvelle valeur de x et on la stocke en tant qu'ancienne valeur.
    document.getElementById("x").innerHTML = "X : " + degreX;
    lastX = degreX;

    //On calcule la position de la bulle selon le ratio en prenant en compte la largeur de la bulle avant de modifier sa position.
    var right = lastX / 180 * screenWidth - (bubbleWidth / 2);
    $("#bubble").css("right", right + "px");
}

function showY () {
    //on affiche la nouvelle valeur de y et on la stocke en tant qu'ancienne valeur.
    document.getElementById("y").innerHTML = "Y : " + degreY;
    lastY = degreY;

    //On calcule la position de la bulle selon le ratio en prenant en compte la taille de la bulle avant de modifier sa position.
    var top = lastY / 180 * screenHeight - (bubbleHeight / 2);
    $("#bubble").css("top", top + "px");
}

app.initialize();