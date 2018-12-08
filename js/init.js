function addGroup(object, num, spriteName){
	object = game.add.group();
	object.enableBody = true;
	object.physicsBodyType = Phaser.Physics.ARCADE;
	object.createMultiple(num, spriteName);
	object.setAll('outOfBoundsKill', true);
	object.setAll('checkWorldBounds', true);

	return object;
}

function createText(){
	textHP = game.add.text(GAME_WIDTH - 150, 15, 'life: ' + player.life, {fill: '#fff'});
	textScore = game.add.text(GAME_WIDTH - 150, 45, 'Score: ' + player.score, {fill: '#fff'});
}
