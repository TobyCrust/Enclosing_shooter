class bullet{
	constructor(xSpd, ySpd){
		this.x = turPosX;
		this.y = turPosY;
		this.xSpd = 15*xSpd;
		this.ySpd = 15*ySpd;
	}

	display(){
		push()


		fill(230, 255, 0, 0);
		ellipse(this.x, this.y, 10);
		fill(230, 0, 0, 135);
		ellipse(this.x, this.y, 9);
		fill(230, 255, 0, 135);
		ellipse(this.x, this.y, 4);
		pop();
	}

	update(){
		this.x += this.xSpd;
		this.y += this.ySpd;
		this.xSpd *= 0.994;
		this.ySpd *= 0.994;
	}

	outOfBounds(){
		return(this.x > width+10 || this.x < -10 || this.y > height+10 || this.y < -10);
	}

	hitScan(){
		for (var i = 0; i < targetBalloons.length; i++){
			var collideOrNot = collideCircleCircle(this.x, this.y, 10, targetBalloons[i].myX(), targetBalloons[i].myY(), targetBalloons[i].myR())
			if (collideOrNot){
				targetBalloons.splice(i,1);
				random(sounds).play();

				score += 1;
				return true;
			}
		}
		return false;
	}
}
