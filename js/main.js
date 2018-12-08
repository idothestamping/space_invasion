var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
	init: init,
	preload: preload,
	create: create,
	update: update
});

function init(){
	displayHighScores();
	console.log('init');
}

function preload(){

	game.physics.startSystem(Phaser.Physics.ARCADE);

	// load some images so we can use them later
	game.load.image('bg', '../assets/img/cool-space-background.jpg');
	game.load.image('player', '../assets/img/x-wing.png');
	game.load.image('laser', '../assets/img/beam.png');
	game.load.image('missile', '../assets/img/missile.png');
	game.load.image('enemy', '../assets/img/tie.png');

	//load sounds and audio
	game.load.audio('music', '../assets/audio/imperial_march.mp3');
	game.load.audio('pewpew', ['../assets/audio/laser.ogg', '../assets/audio/XWing-Laser.wav']);
	game.load.audio('launch', '../assets/audio/Missile.mp3');
	game.load.audio('boom', ['../assets/audio/explosion.ogg', '../assets/audio/boom.mp3']);
	game.load.audio('nukeboom', '../assets/audio/ExplosionNuke.mp3');
	game.load.audio('death', '../assets/audio/Wilhelm-Scream.mp3');

	//load animations
	game.load.spritesheet('smallexplode', '../assets/img/explosion.png', 64, 64);
	game.load.spritesheet('largeexplode', '../assets/img/explode.png', 128, 128);
}

// set initial game state "collisions etc"
function create(){

	//create the background and make it scroll
	var background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
	background.autoScroll(-30, 0);

	//music and sounds
	boom = game.add.audio('boom', 0.3);
	launch = game.add.audio('launch', 1);
	pewpew = game.add.audio('pewpew', 0.1);
	music = new Phaser.Sound(game, 'music', 0.5, true);
	nukeboom = game.add.audio('nukeboom', 0.9);
	death = game.add.audio('death', 0.9);
	setTimeout(function(){
		music.play(); }, 1000);

	//create the player, set it in the world, set any properties
	player = game.add.sprite(PLAYER_START.x, PLAYER_START.y, 'player');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true; //set boundries for the sprite = 'player'
	player.body.drag.x = DRAG;
	player.body.drag.y = DRAG;

	//defined game win/loss parameters
	player.score = 0;
	player.life = PLAYER_LIFE;

	//create group objects for game objects with multiple instance
	largeExplosions = addGroup(largeExplosions, 10, 'largeexplode');
	enemies = addGroup(enemies, 20, 'enemy');
	lasers = addGroup(lasers, 50, 'laser');
	missiles = addGroup(missiles, 20, 'missile');
	smallExplosions = addGroup(smallExplosions, 20, 'smallexplode');

	//add animation to explosions
	largeExplosions.forEach(function(l){
		l.animations.add('largeexplode');
	});
	smallExplosions.forEach(function(s){
		s.animations.add('smallexplode');
	});
	enemies.forEach(function(e){
		e.life = ENEMY_LIFE;
	});

	//define user inputs
	cursors = game.input.keyboard.createCursorKeys(); // Arrow Keys
	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

	//write the starting Player UI on screen
	createText();

	//phaser's version of setInternal
	game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);
}

// game loop, every internal it runs and changes
function update(){
	// stop when no arrow key is pressed

	if(cursors.left.isDown){
		player.body.velocity.x = -PLAYER_VELOCITY;
	}
	if(cursors.up.isDown){
		player.body.velocity.y = -PLAYER_VELOCITY;
	}
	if(cursors.down.isDown){
		player.body.velocity.y = PLAYER_VELOCITY;
	}
	if(cursors.right.isDown){
		player.body.velocity.x = 250;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		//fires weapon
		fireWeapon();
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
		//switch weapons
		switchWeapons();
	}

	//define collision
	game.physics.arcade.overlap(enemies, player, damagePlayer);
	game.physics.arcade.overlap(lasers, enemies, damageEnemy);
	game.physics.arcade.overlap(missiles, enemies, damageEnemy);
}














