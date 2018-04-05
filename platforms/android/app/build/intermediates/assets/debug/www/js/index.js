/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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