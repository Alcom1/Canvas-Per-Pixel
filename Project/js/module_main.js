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
    debug : false,				// debug
	animationID : 0,			//ID index of the current frame.
	
	soul : undefined,
	bbox : undefined,
	
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
		
		//Soul image
		var soulImage = new Image(16, 16);
		soulImage.src = "assets/heart.png";
		
		//Objects
		this.soul = new Soul(309, 310, soulImage, 1);
		this.bbox = new Bbox(162, 250, 315, 140, 1);
		
		// start the game loop
		this.frame();
	},
	
	//Core update
	frame : function()
	{
		//LOOP
	 	this.animationID = requestAnimationFrame(this.frame.bind(this));
	 	
	 	//Calculate Delta Time of frame
	 	var dt = this.calculateDeltaTime();
		
		//Clear
		this.ctx.save();
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
		this.ctx.restore();
		
		//Logic
		this.update(dt);
		
		//Draw
		this.ctx.save();
		this.drawScene(this.ctx);
		this.ctx.restore();
		
		//Draw debug info
		if (this.debug)
		{
			// draw dt in bottom right corner
			this.fillText("dt: " + dt.toFixed(3), this.WIDTH - 140, this.HEIGHT - 10, "18pt courier", "white");
		}
	},
	
	update : function(dt)
	{
		this.soul.move(dt);
		this.soul.limit(this.bbox);
	},
	
	//Draw the main scene
	drawScene : function(ctx, objs)
	{
		this.bbox.draw(ctx);
		this.soul.draw(ctx);
	},
	
	//Draw filled text
	fillText : function(string, x, y, css, color)
	{
		this.ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		this.ctx.font = css;
		this.ctx.fillStyle = color;
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	//Calculate delta-time
	calculateDeltaTime : function()
	{
		// what's with (+ new Date) below?
		// + calls Date.valueOf(), which converts it from an object to a 	
		// primitive (number of milliseconds since January 1, 1970 local time)
		var now,fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
}; // end app.main