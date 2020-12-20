var bike, bikeImg, up;
var backImg;
var ground;
var obstacle, obstacleImg, obstacleGroup;
var ramp, rampImg, rampGroup
function preload() {
    bikeImg = loadImage("images/bike.png")
    backImg = loadImage("images/background.jpg")
    obstacleImg = loadImage("images/obstacle.png")
    up = loadImage("images/up.png")
    rampImg = loadImage("images/ramp1.png")
}
function setup() {
    createCanvas(1000, 400)
    bike = createSprite(80, 300, 50, 50)
    bike.addImage(bikeImg)
    bike.scale = 0.8
    bike.debug = true
    ground = createSprite(0, 360, 2000, 20)
    //ground.visible = false
    obstacleGroup = new Group();
    rampGroup = new Group();
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
    if (bike.x % 500 === 0) {
        camera.position.x = bike.x
    }
    //bike.x < 0 || 
    if (keyDown("space") && bike.y > 240) {
        bike.velocityY = -10
    }
    bike.velocityY = bike.velocityY + 0.8
    console.log(ground.x)
    bike.collide(obstacleGroup)
    spawnObstacle();
    spawnRamp();
    drawSprites();

}
function spawnObstacle() {
    if (frameCount % 100 === 0) {
        obstacle = createSprite(bike.x + 920, 310, 50, 50)
        obstacle.addImage(obstacleImg)
        obstacle.scale = 0.2;
        obstacle.setCollider("circle", 0, 0, 120)
        obstacle.velocityX = -2;
        obstacle.collide(ground)
        obstacle.debug = true
        obstacleGroup.add(obstacle);
    }

}
function spawnRamp() {
    if (frameCount % 100 === 0) {
        ramp = createSprite(500, 310, 50, 50)
        ramp.addImage(rampImg)
        ramp.scale = 0.5;
        ramp.x
        ramp.setCollider("circle", 0, 0, 120)
        ramp.collide(ground)
        ramp.debug = true
        rampGroup.add(ramp);
    }

}