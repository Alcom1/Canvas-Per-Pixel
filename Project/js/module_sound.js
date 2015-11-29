// Sound
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function()
{
	console.log("sound.js module loaded");
	var beep = undefined;	//Audio for player firing
	
	//Init
	function init()
	{
		beep = document.querySelector("#beep");
		beep.volume = 0.3;
	}
	
	//Play Player shooting sfx.
	function playBeep()
	{
		beep.pause();
		beep.currentTime = 0;
		beep.play();
	}
	
	// export a public interface to this module (Why does this need to be same line bracket?)
	return {
		init : init,
		playBeep : playBeep,
	}
}());