var bike, bikeImg, up;
var backImg;
var ground;
var canvas
var obstacle, obstacleImg, obstacleGroup;
var ramp1, ramp2, ramp3, ramp4, rampImg, rampGroup
var end, endGroup;
var nitro = 1;
var sc = 1
var gameState = 0;
var time = 0
var victoryImg;
function preload() {
    bikeImg = loadImage("images/bike.png")
    backImg = loadImage("images/background.jpg")
    obstacleImg = loadImage("images/obstacle.png")
    up = loadImage("images/up.png")
    rampImg = loadImage("images/ramp1.png")
    victoryImg = loadImage("images/victory.png")
}
function setup() {
    canvas = createCanvas(displayWidth, displayHeight - 200);
    bike = createSprite(80, 300, 50, 50)
    bike.addImage(bikeImg)
    bike.scale = 0.8
    ground = createSprite(displayWidth, displayHeight - 220, displayWidth * 2, 20)
    rampGroup = new Group();
    ramp1 = createSprite(1860, displayHeight - 250, 50, 50)
    ramp1.addImage(rampImg)
    ramp1.scale = 0.5;
    ramp1.setCollider("circle", 0, 0, 150)
    ramp1.collide(ground)
    rampGroup.add(ramp1);
    ramp2 = createSprite(3800, displayHeight - 280, 50, 50)
    ramp2.addImage(rampImg)
    ramp2.scale = 0.5;
    ramp2.setCollider("circle", 0, 0, 150)
    ramp2.collide(ground)
    rampGroup.add(ramp2);
    ramp3 = createSprite(7600, displayHeight - 280, 50, 50)
    ramp3.addImage(rampImg)
    ramp3.scale = 0.5;
    ramp3.setCollider("circle", 0, 0, 150)
    ramp3.collide(ground)
    rampGroup.add(ramp3);
    ramp4 = createSprite(9700, displayHeight - 280, 50, 50)
    ramp4.addImage(rampImg)
    ramp4.scale = 0.5;
    ramp4.setCollider("circle", 0, 0, 150)
    ramp4.collide(ground)
    rampGroup.add(ramp4);
    ground.visible = false
    obstacleGroup = new Group();

    endGroup = new Group();
}
function draw() {
    background(backImg)
    if (gameState === 0) {
        fill("red")
        textSize(20)
        strokeWeight(7)
        text("Controls: ", 100, 50)
        text("press right arrow to move forward", 200, 100)
        text("press left arrow to move backward", 200, 150)
        text("press space to jump", 200, 200)
        text("press up arrow for wheelie", 200, 250)
        text("press n for nitro", 200, 300)
        text("Note: You have only 1 nitro", 200, 350)
        text("reach the finish line", 200, 400)
        text("press down arrow to brake", 200, 450)
        text("press 's' to start", 200, 500)

        if (keyDown("s")) {
            gameState = 1
        }
    }
    else if (gameState === 1) {

        if (frameCount % 30 === 0) {
            time++
        }

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
        if (keyDown("n") && nitro > 0) {
            bike.velocityX = 10
            nitro = nitro - 1
        }
        if (bike.velocityX > 9) {
            sc++
        }
        if (bike.velocityX > 9 && sc >= 100) {
            bike.velocityX = 0
        }
        if (bike.x > 10000) {
            gameState = 2
        }
        spawnObstacle();
        spawnRamp();
        endB();
        fill("yellow")
        textSize(20)
        text("Time: " + time + " sec", bike.x, 20)
        drawSprites();
    }
    else if (gameState === 2) {
        textSize(60)
        fill("lime")
        text("You won", bike.x - 450, displayHeight / 2 - 100)
        bike.addImage(victoryImg)
        obstacle.velocityX = 0
        bike.velocityX = 0
        bike.velocityY = bike.velocityY + 0.8
        drawSprites();
    }
    bike.collide(ground)
    ground.x = bike.x

    bike.collide(obstacleGroup)


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

}
function keyPressed() {
    console.log("a")
    if (keyCode === 8) {


    }

}