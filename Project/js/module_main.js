// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main =
{
    WIDTH : 640, 				// Canvas width
    HEIGHT : 480,				// Canvas height
    canvas : undefined,			// Canvas
    ctx : undefined,			// Canvas context
   	lastTime : 0, 				// used by calculateDeltaTime() 
    debug : true,				// debug
	reset : true,
	animationID : 0,			//ID index of the current frame.
	prevKeyDown : undefined,	//keyDown from previous frame.
	
	//Modules
	sound : undefined,			//Sound
	
	//Game state enum
	gameState : undefined,
	GAME_STATE: Object.freeze
	({
		START : 0,
		GAME : 1,
		WIN : 2,
	}),
	
	soul : undefined,
	bbox : undefined,
	conway : undefined,
	
	soulPos : undefined,
	
    //Initialization
	init : function()
	{
		//Init log
		console.log("app.main.init() called");
		
		// init canvas
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;
		
		//Key down from previous frame.
		this.prevKeyDown = myKeys.keydown;
		
		//Game State
		this.gameState = this.GAME_STATE.START;
		
		//Bullet box
		this.bbox = new Bbox(320, 320, 316, 140, 1);
		
		//Player Soul
		this.soulPos = new Vect(309, 310, 0);
		var soulImage = document.getElementById("heart");
		var soulImageDmg = document.getElementById("heart_dmg");
		this.soul = new Soul(this.soulPos.x, this.soulPos.y, soulImage, soulImageDmg, 1);
		this.soul.getCollision(this.ctx);								//Form collision data for player.
		
		// start the game loop
		this.frame();
	},
	
	//Setup and resetup, is used for init and any reset.
	setup : function()
	{
		//Conway
		this.conway = new Conway(167, 255, 77, 33, 4);
		this.conway.createEngine(70, 25, 1, 1);
		this.conway.createEngine(25, 25, 1, 1);
		this.conway.createEngine(40, 0, 1, 1);
		this.conway.createEngine(48, 0, 1, 1);
		this.conway.createEngine(0, 0, 1, 1);
		this.conway.createGlider(70, 0, -1, 1);
		this.conway.createGlider(12, 0, 1, 1);
		this.conway.createGlider(4, 24, 1, -1);
		
		//Player reset
		this.soul.pos = this.soulPos.get();
	},
	
	//Core update
	frame : function()
	{
		//LOOP
	 	this.animationID = requestAnimationFrame(this.frame.bind(this));
		 
		//Damage reset
		if(this.reset && this.soul.dmg)
		{
			this.setup();
			this.sound.playBeep();
		}
	 	
	 	//Calculate Delta Time of frame
	 	var dt = this.calculateDeltaTime();
		
		//Clear
		this.ctx.save();
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
		this.ctx.restore();
		
		//Update
		this.update(dt);
		
		//Draw
		this.draw(this.ctx);
		
		//Save prevKeyDown for next frame.
		this.prevKeyDown = myKeys.keydown.slice();
		
		//Draw debug info
		if (this.debug)
		{
			// draw dt in bottom right corner
			this.fillText(
				"dt: " + dt.toFixed(3),
				this.WIDTH - 140,
				this.HEIGHT - 10,
				"24pt undertale",
				"white",
				false);
		}
	},
	
	//Update logic
	update : function(dt)
	{
		switch(this.gameState)
		{
			case this.GAME_STATE.START:
				if(this.prevKeyDown[myKeys.KEYBOARD.KEY_Z] && !myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
				{
					//Setup
					this.setup();
					this.gameState = this.GAME_STATE.GAME;
				}
				break;
			case this.GAME_STATE.GAME:
				this.conway.update(dt);
				this.bbox.transition(dt);
				this.soul.move(dt);
				this.soul.limit(this.bbox.getBound());
				if(this.conway.getFrameCount() > 1340)
				{
					this.gameState = this.GAME_STATE.WIN;
				}
				break;
			case this.GAME_STATE.WIN:
				if(this.prevKeyDown[myKeys.KEYBOARD.KEY_Z] && !myKeys.keydown[myKeys.KEYBOARD.KEY_Z])
				{
					this.gameState = this.GAME_STATE.START;
				}
				break;
		}
	},
	
	//Draw the main scene
	draw : function(ctx, objs)
	{
		switch(this.gameState)
		{
			case this.GAME_STATE.START:
				this.bbox.draw(ctx);
				this.soul.draw(ctx);
				this.fillText(
					"Press 'Z' to start!", 
					320, 
					439.75, 
					"24pt undertale", 
					"white", 
					true);
				break;
			case this.GAME_STATE.GAME:
				this.bbox.draw(ctx);
				this.conway.draw(ctx);
				this.soul.checkCollision(ctx);
				this.soul.draw(ctx);
				break;
			case this.GAME_STATE.WIN:
				this.bbox.draw(ctx);
				this.soul.draw(ctx);
				this.fillText(
					"You Win!", 
					320, 
					440, 
					"48pt undertale", 
					"white", 
					true);
				break;
		}
	},
	
	//Draw filled text
	fillText : function(string, x, y, css, color, centered)
	{
		this.ctx.save();
		if(centered)
		{
			this.ctx.textAlign = "center";
			this.ctx.textBaseline="middle"; 
		}
		this.ctx.font = css;
		this.ctx.fillStyle = color; 
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	//Calculate delta-time
	calculateDeltaTime : function()
	{
		var now, fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
};