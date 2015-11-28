//Inherits from Obj. Handles and draws a Conway's Game Of Life image.
function Conway(x, y, width, height, scale)
{
	//Inherit from Obj
	Obj.call(
		this,
		x, 
		y, 
		scale);
	
	this.data = new Array(height);	//2D-Array of Conway bool pixels. Conway data.
	for(var j = 0; j < height; j++)	//Fill array with false pixels.
	{
		this.data[j] = new Array(width);
		for(var i = 0; i < width; i++)
		{
			this.data[j][i] = false;
		}
	}
	this.time = .08;	//Second interval between conway updates
	this.counter = 0;	//Counter for conway updates
}

//Inherit from Obj
Conway.prototype = Object.create(Obj.prototype);

//Draw conway
Conway.prototype.draw = function(ctx)
{
	ctx.save();
	
	var imgData = this.formImageData(ctx);	//Get imgData from Conway data
	
	//Create temp canvas with new imgData
	var subCanvas = document.createElement('canvas');
	subCanvas.width = imgData.width;
	subCanvas.height = imgData.height;
	subCanvas.getContext("2d").putImageData(imgData, 0, 0);
	
	//Draw temp canvas on main canvas to scale
	ctx.drawImage(
		subCanvas, 
		0, 
		0,
		subCanvas.width,
		subCanvas.height,
		this.pos.x,
		this.pos.y,
		subCanvas.width * this.scale,
		subCanvas.height * this.scale);
		
	ctx.restore();
}

//Convert Conway data to image data
Conway.prototype.formImageData = function(ctx)
{
	var imgData = ctx.createImageData(this.data[0].length, this.data.length);	//Image data.
	
	//Loop through Image data and change data to match Conway data.
	for(var j = 0; j < imgData.height; j++)
	{
		for(var i = 0; i < imgData.width; i++)
		{
			imgData.data[(j * imgData.width + i) * 4 + 0] = 255;
			imgData.data[(j * imgData.width + i) * 4 + 1] = 255;
			imgData.data[(j * imgData.width + i) * 4 + 2] = 255;
			imgData.data[(j * imgData.width + i) * 4 + 3] = (0 + this.data[j][i]) * 255;
		}		
	}
	
	//Return Image data.
	return imgData;
}

//Create Glider on Conway data at x-y position with x-y flip
Conway.prototype.createGlider = function(x, y, flipX, flipY)
{
	this.data[(y + 0 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 1 * flipY).mod(this.data.length)][(x + 1 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 1 * flipY).mod(this.data.length)][(x + 2 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 2 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 2 * flipY).mod(this.data.length)][(x + 1 * flipX).mod(this.data[0].length)] = true;
}

//Create Engine on Conway data at x-y position with x-y flip
Conway.prototype.createEngine = function(x, y, flipX, flipY)
{
	this.data[(y + 0 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 0 * flipY).mod(this.data.length)][(x + 1 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 0 * flipY).mod(this.data.length)][(x + 2 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 0 * flipY).mod(this.data.length)][(x + 4 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 1 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 2 * flipY).mod(this.data.length)][(x + 3 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 2 * flipY).mod(this.data.length)][(x + 4 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 3 * flipY).mod(this.data.length)][(x + 1 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 3 * flipY).mod(this.data.length)][(x + 2 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 3 * flipY).mod(this.data.length)][(x + 4 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 4 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 4 * flipY).mod(this.data.length)][(x + 2 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 4 * flipY).mod(this.data.length)][(x + 4 * flipX).mod(this.data[0].length)] = true;
}

//Update Conway data.
Conway.prototype.update = function(dt)
{
	this.counter += dt;	//Increment time
	
	//Perform only at intervals.
	if(this.counter > this.time)
	{
		//Reset counter.
		this.counter = this.counter - this.time;
		
		//New data for Conway data
		var newData = [];
		for (var i = 0; i < this.data.length; i++)
		{
			newData[i] = this.data[i].slice();
		}
		
		//Copy updated data to newData
		for(var j = 0; j < this.data.length; j++)
		{
			for(var i = 0; i < this.data[0].length; i++)
			{
				newData[j][i] = this.checkPixel(j, i);
			}
		}
		
		this.data = newData;	//Set Conway data to be new data.
	}
}

//Update a Conway pixel with j/y and i/x coordinates.
Conway.prototype.checkPixel = function(j, i)
{
	var check = 0;	//Check
	
	//Use global square loop and increment check for each true surrounding pixel.
	for(var k = 0; k < 8; k++)
	{
		if(this.data
			[(j + squareLoop[k][0]).mod(this.data.length)]
			[(i + squareLoop[k][1]).mod(this.data[0].length)])
		{
			check++;
		}
	}
	
	//Conway rules.
	if(
		this.data[j][i] && (check == 2 || check == 3) ||
		!this.data[j][i] && check == 3)
	{
		return true;
	}
	else
	{
		return false;
	}
}
