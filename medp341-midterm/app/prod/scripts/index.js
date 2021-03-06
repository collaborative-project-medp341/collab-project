"use strict";

// canvas config
var WIDTH = 720;
var HEIGHT = 480; // posnet config

var video;
var poseNet;
var poseNetIsLoaded = false; //coords

var LeftEyeX = WIDTH / 2;
var RightEyeX = WIDTH / 2;
var LeftEyeY = WIDTH / 2;
var RightEyeY = WIDTH / 2;
var middlePointHeadX;
var middlePointHeadY; //top bar colors 

var selectModeColor = "rgba(96, 125, 139, 1)";
var unselectModeColor = "rgba(38, 50, 56, 1)";
var selectTextColor = "rgba(255, 255, 255, 1)";
var unselectTextColor = "rgba(0, 0, 0, 1)"; //top bar options

var currectTimePast;
var currectTimeFuture;
var pastText;
var futureText; // flock settings 

var flockSize = 10; // images

var animalIMG = "../images/lion.png";
var backgroundIMG = "../images/reef.jpg";

var pnCallback = function pnCallback() {
  console.log('pose net loaded');
};

var getCurrentPose = function getCurrentPose(poses) {
  if (poses.length > 0 && poses[0].pose.keypoints[1].score > .95 && poses[0].pose.keypoints[2].score > .95) {
    var leftEye = poses[0].pose.keypoints[1];
    var rightEye = poses[0].pose.keypoints[2];
    var newLeftEyeX = leftEye.position.x;
    var newRightEyeX = rightEye.position.x;
    var newLeftEyeY = leftEye.position.y;
    var newRightEyeY = rightEye.position.y;
    LeftEyeX = lerp(LeftEyeX, newLeftEyeX, 0.3);
    RightEyeX = lerp(RightEyeX, newRightEyeX, 0.3);
    LeftEyeY = lerp(LeftEyeY, newLeftEyeY, 0.3);
    RightEyeY = lerp(RightEyeY, newRightEyeY, 0.3);
    middlePointHeadX = (LeftEyeX + RightEyeX) / 2;
    middlePointHeadY = (LeftEyeY + RightEyeY) / 2;
  }
};

var poseNetCapture = function poseNetCapture() {
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, pnCallback);
  poseNet.on('pose', getCurrentPose);
};

var runFlock = function runFlock() {
  flock = new Flock(); // Add an initial set of boids into the system

  for (var i = 0; i < flockSize; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
};

var setAnimationPicture = function setAnimationPicture() {
  var path = getURLPath();

  if (path[0] === 'india.html') {
    animalIMG = "../images/thar.png";
    backgroundIMG = "../images/mountains.jpg";
  } else if (path[0] === 'australia.html') {
    animalIMG = "../images/turtle.png";
    backgroundIMG = "../images/reef.jpg";
  } else if (path[0] === 'congo.html') {
    animalIMG = "../images/gorilla.png";
    backgroundIMG = "../images/rainforest.jpg";
  } else if (path[0] === 'brazil.html') {
    animalIMG = "../images/macaw.png";
    backgroundIMG = "../images/pantagal.jpg";
  }
};

function setup() {
  var myCanvas = createCanvas(WIDTH, HEIGHT);
  myCanvas.parent("p5-container");
  setAnimationPicture();
  bg = loadImage(backgroundIMG);
  poseNetCapture(animalIMG);
  flockIMG = loadImage(animalIMG);
  runFlock();
}

var pastFuture = function pastFuture() {
  if (middlePointHeadX > WIDTH / 2) {
    currectTimeFuture = selectModeColor;
    currectTimePast = unselectModeColor;
    pastText = unselectTextColor;
    futureText = selectTextColor; //render objects on future 
    // flockSize = 1
    // runFlock()
  } else {
    currectTimeFuture = unselectModeColor;
    currectTimePast = selectModeColor;
    pastText = selectTextColor;
    futureText = unselectTextColor; //render objects in the past 
    // flockSize = 7
    // runFlock()
  }

  fill(currectTimePast);
  rect(0, 0, WIDTH / 2, 20);
  stroke(0);
  fill(pastText);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Past", WIDTH / 4, 10);
  fill(currectTimeFuture);
  rect(WIDTH / 2, 0, WIDTH, 20);
  stroke(0);
  fill(futureText);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Future", WIDTH / 4 * 3, 10);
};

function draw() {
  // image(video, 0, 0, WIDTH, HEIGHT)
  background(bg);
  fill(255);
  ellipse(middlePointHeadX, middlePointHeadY, 20, 20);
  flock.run(); //pastFuture()
}

$(function () {
  console.log('Page is loaded');
});