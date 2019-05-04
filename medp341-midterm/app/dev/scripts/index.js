// canvas config
const WIDTH = 720
const HEIGHT = 480

// posnet config
let video 
let poseNet 
let poseNetIsLoaded = false 

// 

const pnCallback = () => {
  console.log('pose net loaded')
}

const getCurrentPose = (poses) => {
  if(poses.length > 0){
    console.log(poses)
    let 

  }
}

const poseNetCapture = () => {
  video = createCapture(VIDEO)

  video.hide()

  poseNet = ml5.poseNet(video, pnCallback)

  poseNet.on('pose', getCurrentPose)
}

function setup(){
  createCanvas(WIDTH, HEIGHT)

  poseNetCapture()
}

function draw(){
  image(video, 0, 0, WIDTH, HEIGHT)
}


$(() => {
    console.log('Page is loaded')
})