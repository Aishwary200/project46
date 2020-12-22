var bike, bikeImg, up;
var backImg;
var ground;
var canvas
var obstacle, obstacleImg, obstacleGroup;
var ramp, rampImg, rampGroup
var end, endGroup;
var nitro = 1;
var sc = 1
function preload() {
    bikeImg = loadImage("images/bike.png")
    backImg = loadImage("images/background.jpg")
    obstacleImg = loadImage("images/obstacle.png")
    up = loadImage("images/up.png")
    rampImg = loadImage("images/ramp1.png")
}
function setup() {
    canvas = createCanvas(displayWidth, displayHeight - 200);
    bike = createSprite(80, 300, 50, 50)
    bike.addImage(bikeImg)
    bike.scale = 0.8
    ground = createSprite(displayWidth, displayHeight - 220, displayWidth * 2, 20)

    //ground.visible = false
    obstacleGroup = new Group();
    rampGroup = new Group();
    endGroup = new Group();
}
function draw() {
    background(backImg)

    bike.collide(ground)
    ground.x = bike.x
    if (keyDown(RIGHT_ARROW)) {
        bike.x = bike.x + 10
    }
    if (keyDown(LEFT_ARROW)) {
        bike.x = bike.x - 10
    }
    if (keyDown(UP_ARROW)) {
        bike.addImage(up)
        bike.setCollider("circle", 0, 0, 100)
    }
    else {
        bike.addImage(bikeImg)
        bike.setCollider("rectangle", 0, -10, 150, 160)
    }
    if (keyDown(DOWN_ARROW)) {
        bike.velocityX = 0
    }
    if (keyDown("space") && bike.y > 450) {
        bike.velocityY = -10
    }
    bike.velocityY = bike.velocityY + 0.8
    if (bike.isTouching(rampGroup)) {
        bike.y = bike.y - 100
        bike.x = bike.x + 200
    }
    if (bike.isTouching(endGroup)) {
        camera.position.x = bike.x
    }
    if (keyDown("n") && nitro>0) {
        bike.velocityX = 10
        nitro = nitro - 1
    }
    if (bike.velocityX > 9) {
        sc++
    }
    if (bike.velocityX > 9 && sc >= 100) {
        bike.velocityX = 0
    }
    
    bike.collide(obstacleGroup)
    spawnObstacle();
    spawnRamp();
    endB();
    drawSprites();
    console.log(sc)
}
function spawnObstacle() {

    if (frameCount % 100 === 0) {

        obstacle = createSprite(bike.x + 1300, displayHeight - 270, 50, 50)
        obstacle.addImage(obstacleImg)
        obstacle.scale = 0.2;
        obstacle.setCollider("circle", 0, 0, 120)
        obstacle.velocityX = -6;
        obstacle.collide(ground)
        obstacleGroup.add(obstacle);

    }

}
function endB() {
    if (frameCount % 50 === 0) {
        end = createSprite(bike.x + 1286, displayHeight / 2, 10, displayHeight)
        end.visible = false;
        endGroup.add(end)
    }
}
function spawnRamp() {
    if (bike.x % 1000 === 0) {
        ramp = createSprite(bike.x + 1200, displayHeight - 250, 50, 50)
        ramp.addImage(rampImg)
        ramp.scale = 0.5;
        ramp.setCollider("circle", 0, 0, 150)
        ramp.collide(ground)
        rampGroup.add(ramp);
    }

}
function keyPressed() {
    console.log("a")
    if (keyCode === 8) {


    }

}