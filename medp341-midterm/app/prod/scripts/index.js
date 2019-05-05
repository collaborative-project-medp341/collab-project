"use strict";

// canvas config
var WIDTH = 720;
var HEIGHT = 480; // posnet config

var video;
var poseNet;
var poseNetIsLoaded = false; //coords

var LeftEyeX = WIDTH / 2;
var RightEyeX = WIDTH / 2;
var middlePointHead; //top bar colors 

var selectModeColor = "rgba(96, 125, 139, 1)";
var unselectModeColor = "rgba(38, 50, 56, 1)";
var selectTextColor = "rgba(255, 255, 255, 1)";
var unselectTextColor = "rgba(0, 0, 0, 1)"; //top bar options

var currectTimePast;
var currectTimeFuture;
var pastText;
var futureText;

var pnCallback = function pnCallback() {
  console.log('pose net loaded');
};

var getCurrentPose = function getCurrentPose(poses) {
  if (poses.length > 0 && poses[0].pose.keypoints[1].score > .95 && poses[0].pose.keypoints[2].score > .95) {
    var leftEye = poses[0].pose.keypoints[1];
    var rightEye = poses[0].pose.keypoints[2];
    var newLeftEyeX = leftEye.position.x;
    var newRightEyeX = rightEye.position.x;
    LeftEyeX = lerp(LeftEyeX, newLeftEyeX, 0.3);
    RightEyeX = lerp(RightEyeX, newRightEyeX, 0.3);
    middlePointHead = (LeftEyeX + RightEyeX) / 2;
  }
};

var poseNetCapture = function poseNetCapture() {
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, pnCallback);
  poseNet.on('pose', getCurrentPose);
};

function setup() {
  createCanvas(WIDTH, HEIGHT);
  poseNetCapture();
  flock = new Flock(); // Add an initial set of boids into the system

  for (var i = 0; i < 100; i++) {
    var b = new Boid(width / 2, height / 2);
    flock.addBoid(b);
  }
}

function draw() {
  image(video, 0, 0, WIDTH, HEIGHT);
  fill(255);
  ellipse(middlePointHead, 144, 20, 20);
  flock.run();

  if (middlePointHead > WIDTH / 2) {
    currectTimeFuture = selectModeColor;
    currectTimePast = unselectModeColor;
    pastText = unselectTextColor;
    futureText = selectTextColor; //render objects on future 
  } else {
    currectTimeFuture = unselectModeColor;
    currectTimePast = selectModeColor;
    pastText = selectTextColor;
    futureText = unselectTextColor; //render objects in the past 
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
}

$(function () {
  console.log('Page is loaded');
});