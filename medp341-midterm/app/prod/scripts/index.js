"use strict";

//canvas config
var WIDTH = 720;
var HEIGHT = 480; //posnet config

var video;
var poseNet;
var poseNetIsLoaded = false;

var pnCallback = function pnCallback() {
  console.log('pose net loaded');
};

var getCurrentPose = function getCurrentPose(poses) {
  if (poses.length > 0) {
    console.log(poses);
  }
};

var poseNetCapture = function poseNetCapture() {
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, pnCallback);
  poseNet.on('pose', getCurrentPose);
};

var setup = function setup() {
  createCanvas(WIDTH, HEIGHT);
  poseNetCapture();
};

var draw = function draw() {
  image(video, 0, 0, WIDTH, HEIGHT);
};

$(function () {
  console.log('Page is loaded');
});