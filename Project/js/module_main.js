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
	
	soul : undefined,
	bbox : undefined,
	conway : undefined,
	
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
		
		//Setup
		this.setup();
		
		// start the game loop
		this.frame();
	},
	
	setup : function()
	{
		//Soul image
		var soulImage = new Image(16, 16);
		soulImage.src = "assets/heart.png";
		var soulImageDmg = new Image(16, 16);
		soulImageDmg.src = "assets/heart_dmg.png";
		
		//Objects
		this.conway = new Conway(167, 255, 77, 33, 4);
		this.conway.createEngine(70, 25, 1, 1);
		this.conway.createEngine(25, 25, 1, 1);
		this.conway.createEngine(40, 0, 1, 1);
		this.conway.createEngine(48, 0, 1, 1);
		this.conway.createEngine(0, 0, 1, 1);
		this.conway.createGlider(70, 0, -1, 1);
		this.conway.createGlider(12, 0, 1, 1);
		this.conway.createGlider(4, 24, 1, -1);
		this.bbox = new Bbox(320, 320, 316, 140, 1);
		this.soul = new Soul(309, 310, soulImage, soulImageDmg, 1);
		this.soul.getCollision(this.ctx);								//Form collision data for player.
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
		
		//Draw debug info
		if (this.debug)
		{
			// draw dt in bottom right corner
			this.fillText("dt: " + dt.toFixed(3), this.WIDTH - 140, this.HEIGHT - 10, "18pt courier", "white");
		}
	},
	
	//Update logic
	update : function(dt)
	{
		this.conway.update(dt);
		this.bbox.transition(dt);
		this.soul.move(dt);
		this.soul.limit(this.bbox.getBound());
	},
	
	//Draw the main scene
	draw : function(ctx, objs)
	{
		this.bbox.draw(ctx);
		this.conway.draw(ctx);
		this.soul.checkCollision(ctx);
		this.soul.draw(ctx);
	},
	
	//Draw filled text
	fillText : function(string, x, y, css, color)
	{
		this.ctx.save();
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