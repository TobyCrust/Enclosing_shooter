let bulletsFired = [];
let targetBalloons = [];
let	mainTurrent;
let turPosX = 300;
let turPosY = 300;
let targetTimer = 0;
let balloonSpawnMultiplier = 2;
let balloonSizeMultiplier = 2;
let score = 0;
let minute = 0;
let Retry;
let s = 0;
var sounds = [];


let highScore = 0;


function setup() {
	createCanvas(600, 600);
	song = loadSound('shoot_effect.mp3');

	angleMode(DEGREES);
	mainTurrent = new turrent(300,300);
	Retry = createButton('retry');
	Retry.hide();

	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
}


function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
	song.play();

}

function preload() {
  rocket= loadImage('rocket.png')
	ufo= loadImage('Alien.png')
	sounds.push(loadSound('bangLarge.wav'));
	sounds.push(loadSound('bangMedium.wav'));
	sounds.push(loadSound('bangSmall.wav'));
}

function draw() {
	background(20);

let s = second();

	drawReticle();
push();
	angleMode(DEGREES);
	       imageMode(CENTER)
	       let a = atan2(mouseY - height / 2, mouseX - width / 2);
	       translate(width/2, height/2);
	       rotate(a);
	       image(rocket, 0, 0, 48, 26);
pop();
  print(score);

	//----------------------------------------BALLOONS-SPAWN--------------------------------------
	targetTimer += 1;
	let spawnInterval = int(100 / balloonSpawnMultiplier);
	//print(spawnInterval)
	if (targetTimer % spawnInterval == 0){
		let newBalloon = new balloon();
		targetBalloons.push(newBalloon);
		score += 5;
	}


	//----------------------------------------------BULLETS----------------------------------------
	for (var i = 0; i < bulletsFired.length; i++){
		bulletsFired[i].display();
		bulletsFired[i].update();
		if (bulletsFired[i].outOfBounds()){
      		bulletsFired.splice(i,1);
    	}
		else if (bulletsFired[i].hitScan()){
      		bulletsFired.splice(i,1);
    	}
	}


	//-------------------------------------------EVIL-BALLOONS----------------------------------------
	for (var i = 0; i < targetBalloons.length; i++){
		targetBalloons[i].display();
		targetBalloons[i].update();
		if (targetBalloons[i].outOfBounds()){
      		targetBalloons.splice(i,1);
    	}
	}

	balloonSpawnMultiplier += 0.001;
	if (balloonSizeMultiplier < 5){
		balloonSizeMultiplier += 0.0007;
	}

	//------------------------------------------HERO-AND-HERO-DED---------------------------------------a
	mainTurrent.display();
	mainTurrent.move();
	if (mainTurrent.hitScan()){
		gameOver();
	}

  fill(225);
  textAlign(RIGHT);
  textSize(30);
  text(score,570,40);

  textSize(24);
	text("Time",570,80);
  text("Score",510,40);
	text(s, 570, 120);
	text(minute, 570, 150);


	//------------------------------------------TUTORIAL------------------------------------------------
	noStroke();
	if (targetTimer < 500){
		textAlign(LEFT);
		textFont('Arial');
		textSize(14);

		text("arrow keys or wasd: move", 35, 35);
		text("mouse: aim", 35, 50);
		text("left click: fire", 35, 65);

	}

if( s = 59){
	minute =+1;
}


	}
//------------------------------------------Score------------------------------------------------
df
