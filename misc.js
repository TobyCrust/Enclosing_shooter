function getMouseVector(){
	let mouseXalt = mouseX - turPosX;
	let mouseYalt = mouseY - turPosY;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

function drawReticle(){
	noFill();
	strokeWeight(2);
	stroke(255, 204, 0, 200);
	ellipse(mouseX, mouseY, 14);
	stroke(255, 204, 0, 125);
	line(mouseX-9, mouseY-9, mouseX+9, mouseY+9);
	line(mouseX+9, mouseY-9, mouseX-9, mouseY+9);
	stroke(255, 204, 0, 125);

}

function gameOver(){
	push();

	print("DED");
	noStroke();
	fill(20)
	rect(510,300,1100,250)

	textFont(pxlfont);
	textAlign(CENTER);
	textSize(15);
	fill(225,0,0);
	var deathWords = random(deathPhrase); // random death phrases
	text(deathWords,425,280);


	textSize(18);
	fill(235);
	let scoreString = "Score: " + score;
	text(scoreString, 425, 330);

	if (score > highScore) {
		highScore = score;
		Cookies.remove('Highscore');
		Cookies.set('Highscore', highScore);
	}

	let highScoreString = "Highscore: " + highScore;
	text(highScoreString, 425, 360);

	Retry.show();
	Retry.position(390, 380);
	Retry.size(100,30);
	Retry.style('background-color', '#202020');
	Retry.style('color', '#FFFFFF');
	Retry.mousePressed(reset);

	gamesong.stop();
	gameover.stop();
	gameover.play();
	pop();
	noLoop();

}

function reset(){

	Retry.hide();
	mode = 0;
	gameover.stop();
	bulletsFired = [];
	targetBalloons = [];
	turPosX = width/2;
	turPosY = height/2;
	targetTimer = 0;
	balloonSpawnMultiplier = 2;
	balloonSizeMultiplier = 2;
	score = 0;
	s = 0
	enemyAmount = 200;

	loop();
}
function startGame(){
	mode = 1;

}
