var song = "";
var wristVol = 0;
var wristSp = 0;
var leftWX = 0;
var leftWY = 0;
var rightWX = 0;
var rightWY = 0;

function preload() {
    song = loadSound("Pollo.mp3");
}

function setup() {
    canvas = createCanvas(720, 480);
    canvas.center();
    videoCap = createCapture(VIDEO);
    videoCap.hide()
    poseNet = ml5.poseNet(videoCap, modelLoaded);
    poseNet.on('pose', gotPosses);
}

function modelLoaded() {
    console.log("¡poseNet inicio!");
}

function gotPosses(results) {
    if (results.length > 0) {
        wristVol = results[0].pose.keypoints[10].score;
        wristSp = results[0].pose.keypoints[9].score;
        console.log("El volumen es: " + wristVol + "\n Y la velocidad es: " + wristSp);
        rightWX = results[0].pose.rightWrist.x;
        rightWY = results[0].pose.rightWrist.y;
        console.log("La posicion X de la muñeca derecha es: " + rightWX + "e Y es: " + rightWY);
        leftWX = results[0].pose.leftWrist.x;
        leftWY = results[0].pose.leftWrist.y;
        console.log("La posicion X de la muñeca izquierda es: " + rightWX + "e Y es: " + rightWY);
    }
}

function draw() {
    image(videoCap, 0, 0, 720, 480);
    fill("#ffffff");
    stroke("#000000");
    if (wristSp > 0.2) {
        circle(leftWY, leftWY, 20);
        if (leftWY > 0 && leftWY <= 100) {
            document.getElementById("SpeedH3").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        }
        else if(leftWY > 100 && leftWY <= 200) {
            document.getElementById("SpeedH3").innerHTML = "Speed: 1x";
            song.rate(1);
        }
        else if(leftWY > 200 && leftWY <=300) {
            document.getElementById("SpeedH3").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        }
        else if(leftWY > 300 && leftWY <= 400) {
            document.getElementById("SpeedH3").innerHTML = "Speed: 2x";
            song.rate(2);
        }
        else if(leftWY > 400) {
            document.getElementById("SpeedH3").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }
    }
    if (wristVol > 0.2) {
        circle(rightWX, rightWY, 20);
        var wristRY = Number(rightWY);
        var floorRY = floor(wristRY * 2);
        var divition = floorRY / 1000;
        document.getElementById("VolumeH3").innerHTML = "Volume: " + divition;
        song.setVolume(divition);
    }
}

function Play() {
    song.stop()
    song.play();
    song.setVolume(1);
    song.rate(1);
}