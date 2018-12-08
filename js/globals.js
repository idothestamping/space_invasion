// Constents
var DRAG = 250;
var ENEMY_LIFE = 100;
var GAME_HEIGHT = 500;
var GAME_WIDTH = 750;
var PLAYER_LIFE = 100;
var PLAYER_START = {
	x: 100,
	y: 200
};

var PLAYER_VELOCITY = 150;
var SCORE_SLOTS = 5;
var WEAPONS = [
	{name: 'Laser', velocity: 450, timer: 200, offset: 22, damage: 25},
	{name: 'Missile', velocity: 275, timer: 650, offset: 22, damage: 100},
];

// Global veriables
var boom;
var cursors;
var largeExplosions;
var music;
var nukeboom;
var pewpew;
var death;
var smallExplosions;
var textHP;
var textScore;


// game objects
var enemies;
var lasers;
var missiles;
var player;

var currentWeapon = 0;
var switchTimer = 0;
var weaponTimer = 0;