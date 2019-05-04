"use strict";

//canvas settings 
var WIDTH = 720;
var HEIGHT = 480; //posenet

var video;
var poseNet;
var posNetLoaded = false; //head movement coordinates 

var RightEarX = WIDTH / 2;
var RightEarY = HEIGHT / 2;
var LeftEarX = WIDTH / 2;
var LeftEarY = HEIGHT / 2; //ball information

var numBalls = 1;
var spring = 0.6;
var gravity = 0.3;
var friction = -1;
var balls = []; //game 

var soccerIMG;
var soccerHits = 0;
var GAME = false;
var endGame = false;
var isBallHit = false;

var startGame = function startGame(gameDifficulty) {
  console.log('starting game ');
  GAME = !GAME;
  numBalls = gameDifficulty;
};

function setup() {
  createCanvas(WIDTH, HEIGHT);
  soccerIMG = loadImage("../images/soccerball.png");

  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball(random(WIDTH - WIDTH * .6, WIDTH - WIDTH * .4), 0, random(30, 70), i, balls);
    noStroke();
    callPoseNet();
  }
}

var getCurrentPose = function getCurrentPose(poses) {
  console.log(poses);

  if (poses.length > 0) {
    var newLeftEarX = poses[0].pose.keypoints[3].position.x;
    var newLeftEarY = poses[0].pose.keypoints[3].position.y - 150;
    var newRightEarX = poses[0].pose.keypoints[4].position.x;
    var newRightEarY = poses[0].pose.keypoints[4].position.y - 150;
    LeftEarX = lerp(LeftEarX, newLeftEarX, 0.2);
    LeftEarY = lerp(LeftEarY, newLeftEarY, 0.2);
    RightEarX = lerp(RightEarX, newRightEarX, 0.2);
    RightEarY = lerp(RightEarY, newRightEarY, 0.2);
  }
};

var callPoseNet = function callPoseNet() {
  //dom video capture
  video = createCapture(VIDEO);
  video.hide(); //load poseNet api

  poseNet = ml5.poseNet(video, cbReady); //get poseNet pose 

  poseNet.on('pose', getCurrentPose);
};

var cbReady = function cbReady() {
  posNetLoaded = true;
};

function draw() {
  image(video, 0, 0, WIDTH, HEIGHT);

  if (posNetLoaded && GAME) {
    background(0);
    image(video, 0, 0, WIDTH, HEIGHT); //head line     

    stroke(153);
    line(LeftEarX, LeftEarY, RightEarX, RightEarY); //start game 

    if (!endGame) {
      stroke(0);
      fill(255);
      textSize(80);
      text(soccerHits, WIDTH - 120, 70);
      balls.forEach(function (ball) {
        ball.move();
        ball.display();
      });
    } else {
      stroke(0);
      fill(255);
      textSize(80);
      textAlign(CENTER, CENTER);
      text("Game Over", WIDTH / 2, HEIGHT / 2);
    }
  }
}

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
  return results !== null ? results[1] || 0 : false;
};

$('load', function () {
  startGame($.urlParam('mode'));
});