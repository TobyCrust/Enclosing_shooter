class turrent{
	constructor(){
	}

	display(){
		push()
		stroke(0, 0, 0);
		fill(26, 26, 26);
		ellipse(turPosX, turPosY, 30);
		image(ufo,turPosX,turPosY,40,40);
		pop();
	}

	move(){
			if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && turPosX > 5) {
    			turPosX -= playerSpeed;
	  		}
  			if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && turPosX < width-5) {
    			turPosX += playerSpeed;
  			}
  			if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && turPosY > 5) {
    			turPosY -= playerSpeed;
  			}
  			if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && turPosY < height-5) {
    			turPosY += playerSpeed;
  			}
		}

	hitScan(){
		for (var i = 0; i < targetBalloons.length; i++){
			var collideOrNot = collideCircleCircle(turPosX, turPosY, 30, targetBalloons[i].myX(), targetBalloons[i].myY(), targetBalloons[i].myR())
			if (collideOrNot){
				return true;
			}
		}
		return false;
	}
}
