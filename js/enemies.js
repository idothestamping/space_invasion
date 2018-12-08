function spawnEnemy(){
	console.log("enemy spawn");
	var enemy = enemies.getFirstExists(false);
	enemy.reset(GAME_WIDTH - 10, game.rnd.integerInRange(10, GAME_HEIGHT - 10));
	enemy.body.velocity.x = game.rnd.integerInRange(-500, -50);
	enemy.body.velocity.y = game.rnd.integerInRange(-100, 100);
	enemy.body.drag.y = 60;
	enemy.life = ENEMY_LIFE;
}

function damagePlayer(p, enemy){
	// sounds and visual effects
	boom.play();
	enemy.kill();
	player.life -= 25;
	textHP.text = 'Life: ' + player.life;

	if(player.life <= 0){
		var explosion = largeExplosions.getFirstExists(false);
		explosion.reset(enemy.body.x, enemy.body.y);
		explosion.play('largeexplode', 30, false, true);
		boom.play();
		death.play();
		player.kill();
		gameOver();
	}
	else if(player.life <= 40){
		var explosion = smallExplosions.getFirstExists(false);
		explosion.reset(enemy.body.x, enemy.body.y);
		explosion.play('smallexplode', 30, false, true);
		boom.play();
		player.tint = '0xff0000';
	}
}

function damageEnemy(weapon, enemy){
	//sounds and visual effects
	if(WEAPONS[currentWeapon].name === 'Laser'){
		explode('small', enemy.body);
	}
	else if(WEAPONS[currentWeapon].name === 'Missile'){
		explode('large', enemy.body);
	}
	//game logic
	weapon.kill();
	enemy.life -= WEAPONS[currentWeapon].damage;

	if(enemy.life <= 0){
		enemy.kill();
		addScore(10);
		//add score
	}

}

function explode(size, body){
	if(size === 'large'){
		var explosion = largeExplosions.getFirstExists(false);
		explosion.reset(body.x, body.y);
		explosion.play('largeexplode', 30, false, true);
		nukeboom.play();
	}
	else if(size === 'small'){
		var explosion = smallExplosions.getFirstExists(false);
		explosion.reset(body.x, body.y);
		explosion.play('smallexplode', 30, false, true);
		boom.play();
	}
}
