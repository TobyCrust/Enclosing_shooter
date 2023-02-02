var mode;
var pxlfont;
let bulletsFired = [];
let targetBalloons = [];
let	mainTurrent;
let turPosX = 850/2;
let turPosY = 700/2;
let targetTimer = 0;
let balloonSpawnMultiplier = 1; //speed
let balloonSizeMultiplier = 2;
let score = 0;
let Retry;
var sounds = [];
let highScore = 0;
var stars = [];
var playerSpeed = 2;
let angle = 0;
let asteroids = [];
let wen;
let spin =0;
let enemyAmount = 200;
let Start;
var deathPhrase = ["YOU DIED", "GAME OVER", "YOU BLEW UP", "BETTER LUCK NEXT TIME", "YOU SUCK"];
var gameVolume = 1;
let bgAnim;
let Credits;
var starSize = 3;

function setup() {

	wen = 0;

	// wen = floor(random(0,1));
	createCanvas(850, 700);
	rectMode(CENTER);
	imageMode(CENTER);
	mode = 0;

	for (var i = 0; i < 500; i++) {
			stars[i] = new Star();
		}

	song = loadSound('shoot_effect.mp3');

 	gameover = loadSound('gameover.mp3');

	angleMode(DEGREES);
	mainTurrent = new turrent(0,0);

	Retry = createButton('Respawn');
	Retry.hide();

	Home = createButton('');
	Home.size(327,120);
	Home.style('background-color', '#FFFFFF50' , 'font-size', '50px');
	Home.position(263, height/2-49);

	Start =  createButton('');
	Start.size(327,120);
	Start.style('background-color', '#ff000000');
	Start.position(263, height/2-49);

	Credits =  createButton('');
	Credits.position(263, height/2+60);
	Credits.size(327,120);
	Credits.style('background-color', '#ff000000');
	// Start.style()


	if (!Cookies.get('highscore')){
		Cookies.set('highscore', '0');
	}
	highScore = Cookies.get('highscore');
}

// function words(){
// 	createP('words');
// }

function mousePressed(){
	let mouseVector = getMouseVector();
	oneBullet = new bullet(mouseVector.x, mouseVector.y);
	bulletsFired.push(oneBullet);
	song.play();


}

function preload() {
	bgAnim = loadImage('bg-anim.gif');
	titlepage = loadImage('Homepage.png');
  rocket= loadImage('rocket.png');
	ufo= loadImage('UFO V2.png');
	pxlfont = loadFont('PressStart2P.ttf');
	for (let i = 0; i< 2; i++){
	asteroids[i] = loadImage('asteroid' + i + '.png');
	shot = loadImage('BulletB.png');
	}
	// asteroids[0] = loadImage('asteroid 3.png');
	// asteroids[1] = loadImage('asteroid 1.png');

	gamesong = loadSound('GameTheme.mp3');
	sounds.push(loadSound('bangLarge.wav'));
	sounds.push(loadSound('bangMedium.wav'));
	sounds.push(loadSound('bangSmall.wav'));
}

function draw() {
clear();

image(titlepage, width/2, height/2, 850, 700);
push();
image(bgAnim, 0, 0, width/2, height/2);
pop();
Start.mousePressed(startGame); // button to start game. will have to hide it under the other buttons
Credits.mousePressed(creditTime); // button that takes you to credits screen
Home.mousePressed(toHome); //Homepage
spin += 0.4*balloonSizeMultiplier;
textFont(pxlfont);
textSize(35);
gamesong.setVolume(gameVolume-0.3);
if (mode==0) {
	text('START', 330, 365);
	Start.show();
	Credits.show();
	Home.hide();
	textSize(25);
	text('CREDITS', 330, 480);
}

if (mode==1) {
Start.hide();
Credits.hide();

	background(27,26,26);

	for (var i = 0; i < stars.length; i++) {
			stars[i].draw();
		}

	// push();
  // translate(100, 100);
  // rotate(angle);
  // fill('red');
  // rect(0, 0, 50, 50);
  // pop();
	// angle += 1;

let s = second();

	drawReticle();

	// rocket ship with mouse example
// push();
// 	angleMode(DEGREES);
// 	       imageMode(CENTER)
// 	       let a = atan2(mouseY - height / 2, mouseX - width / 2);
// 	       translate(width/2, height/2);
// 	       rotate(a);
// 	       image(rocket, 0, 0, 48, 26);
// pop();
  print(score);

	//----------------------------------------BALLOONS-SPAWN--------------------------------------
	targetTimer += 1;
	let spawnInterval = int(enemyAmount / balloonSpawnMultiplier);
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

	balloonSpawnMultiplier += 0.0005; //speed
	enemyAmount -= 0.015;
	if (balloonSizeMultiplier < 5){
		balloonSizeMultiplier += 0.0002;
		gameVolume = 1;
	}

	//------------------------------------------HERO-AND-HERO-DED---------------------------------------a
	mainTurrent.display();
	mainTurrent.move();
	if (mainTurrent.hitScan()){
		gameOver();
	}

	//------------------------------------------Score---------------------------------------a

	textFont(pxlfont);
	textSize(18);
	fill(225);
	textAlign(CENTER);
	text(score,425,70,);
	textSize(24);
	text("Score",425,40);


	//------------------------------------------TUTORIAL------------------------------------------------
	noStroke();
	if (targetTimer < 500){
		textAlign(LEFT);
		textFont('Arial');
		textSize(68);
		text("arrow keys or wasd: move", 35, 35);
		text("mouse: aim", 35, 50);
		text("left click: fire", 35, 65);
	}

	}

	//------------------------------------------Credits Screen------------------------------------------------
if (mode == 2){

	push();

	text("credits", 300,300);
	Start.hide();
	Credits.hide();
	Home.show();
	background(27,26,26);
	starSize +=1;

	for (var i = 0; i < stars.length; i++) {
			stars[i].draw();

		}

			fill(220);
			textAlign(LEFT);
			textFont(pxlfont);
			textSize(25);
			text("Game creator: Toby Crust", 115, 65);
			textSize(15);
			text("Illustrator: Sumaya Abrahams", 35, 200);
			text("left click: fire", 35, 605);
			textSize(35);
			text('Homepage', 280, 365);

			let a = createA('http://p5js.org/', 'Toby Crust');
			a.position(width/2, 75);

			pop();
			


}



}

// draw ends -----------------------------------------------------




function keyPressed(){
	if (keyCode==ENTER){
		mode=1;
		// setTimeout(words,3000);

		gamesong.play();
		gameover.stop();
	}
}



	class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, starSize);
		this.t = random(TAU);
	}

	draw() {
		this.t += 0.5;
		var scale = this.size + sin(this.t) * 1.5;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}

//------------------------------------------Score------------------------------------------------
