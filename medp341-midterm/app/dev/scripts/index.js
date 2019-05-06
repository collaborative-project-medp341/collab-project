// canvas config
const WIDTH = 720
const HEIGHT = 480

// posnet config
let video 
let poseNet 
let poseNetIsLoaded = false 

//coords
let LeftEyeX = WIDTH / 2
let RightEyeX = WIDTH / 2
let LeftEyeY = WIDTH / 2
let RightEyeY = WIDTH / 2
let middlePointHeadX
let middlePointHeadY



//top bar colors 
let selectModeColor = `rgba(96, 125, 139, 1)`
let unselectModeColor = `rgba(38, 50, 56, 1)`
let selectTextColor = `rgba(255, 255, 255, 1)`
let unselectTextColor = `rgba(0, 0, 0, 1)`

//top bar options
let currectTimePast
let currectTimeFuture
let pastText 
let futureText 

// flock settings 
let flockSize = 10

// images
let animalIMG = `../images/lion.png`
let backgroundIMG = `../images/reef.jpg`

const pnCallback = () => {
  console.log('pose net loaded')
}

const getCurrentPose = (poses) => {
  if(poses.length > 0 && poses[0].pose.keypoints[1].score > .95 && poses[0].pose.keypoints[2].score > .95){
    let leftEye = poses[0].pose.keypoints[1]
    let rightEye = poses[0].pose.keypoints[2]
  
    let newLeftEyeX = leftEye.position.x
    let newRightEyeX = rightEye.position.x

    let newLeftEyeY = leftEye.position.y
    let newRightEyeY = rightEye.position.y

    LeftEyeX = lerp(LeftEyeX, newLeftEyeX, 0.3)
    RightEyeX = lerp(RightEyeX, newRightEyeX, 0.3)

    LeftEyeY = lerp(LeftEyeY, newLeftEyeY, 0.3)
    RightEyeY = lerp(RightEyeY, newRightEyeY, 0.3)

    middlePointHeadX = ((LeftEyeX + RightEyeX) / 2)
    middlePointHeadY = ((LeftEyeY + RightEyeY) / 2)

  }
}

const poseNetCapture = () => {
  video = createCapture(VIDEO)
  video.hide()

  poseNet = ml5.poseNet(video, pnCallback)

  poseNet.on('pose', getCurrentPose)
}

const runFlock = () => {
  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < flockSize; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
  }

}

const setAnimationPicture = () => {
  let path = getURLPath()

  if (path[0] === 'india.html'){
    animalIMG = `../images/thar.png`
    backgroundIMG = `../images/mountains.jpg`

  } else if (path[0] === 'australia.html') {
    animalIMG = `../images/turtle.png`
    backgroundIMG = `../images/reef.jpg`

  } else if (path[0] === 'congo.html') {
    animalIMG = `../images/gorilla.png`
    backgroundIMG = `../images/rainforest.jpg`

  } else if (path[0] === 'brazil.html') {
    animalIMG = `../images/macaw.png`
    backgroundIMG = `../images/pantagal.jpg`
    
  }


}

function setup(){

  setAnimationPicture()

  bg = loadImage(backgroundIMG)
  createCanvas(WIDTH, HEIGHT)



  poseNetCapture(animalIMG)

  flockIMG = loadImage(animalIMG)

  runFlock()

}

const pastFuture = () => {
  if (middlePointHeadX > (WIDTH / 2)){
    currectTimeFuture = selectModeColor
    currectTimePast = unselectModeColor
    pastText = unselectTextColor
    futureText = selectTextColor
    //render objects on future 
    // flockSize = 1
    // runFlock()
  } else {
    currectTimeFuture = unselectModeColor
    currectTimePast = selectModeColor
    pastText = selectTextColor
    futureText = unselectTextColor
    //render objects in the past 
    // flockSize = 7
    // runFlock()
  }

  fill(currectTimePast)
  rect(0 , 0, WIDTH / 2, 20)
  stroke(0);
  fill(pastText);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`Past`, WIDTH / 4, 10)


  fill(currectTimeFuture)
  rect(WIDTH / 2, 0, WIDTH, 20)
  stroke(0);
  fill(futureText);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(`Future`, ((WIDTH / 4) * 3), 10)
}


function draw(){
  // image(video, 0, 0, WIDTH, HEIGHT)
  background(bg)

  fill(255);
  ellipse(middlePointHeadX, middlePointHeadY, 20, 20);
  flock.run();

  //pastFuture()

}


$(() => {
    console.log('Page is loaded')
})