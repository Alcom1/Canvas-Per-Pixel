function Conway(x, y, width, height, scale)
{
	Obj.call(
		this,
		x, 
		y, 
		scale);
	
	this.data = new Array(height);
	for(var j = 0; j < height; j++)
	{
		this.data[j] = new Array(width);
		for(var i = 0; i < width; i++)
		{
			this.data[j][i] = false;
		}
	}
}

Conway.prototype = Object.create(Obj.prototype);

Conway.prototype.draw = function(ctx)
{
	ctx.save();
	var imgData = this.formImageData(ctx);
	var subCanvas = document.createElement('canvas');
	subCanvas.width = imgData.width;
	subCanvas.height = imgData.height;
	
	subCanvas.getContext("2d").putImageData(imgData, 0, 0);
	
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

Conway.prototype.formImageData = function(ctx)
{
	var imgData = ctx.createImageData(this.data[0].length, this.data.length);
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
	
	return imgData;
}

Conway.prototype.createGlider = function(x, y)
{
	this.data[y + 0][x + 0] = true;
	this.data[y + 1][x + 1] = true;
	this.data[y + 1][x + 2] = true;
	this.data[y + 2][x + 0] = true;
	this.data[y + 2][x + 1] = true;
}

Conway.prototype.update = function()
{
	for(var j = 0; j < this.data.length; j++)
	{
		for(var i = 0; i < this.data[0].length; i++)
		{
			this.checkPixel(i, j);
		}
	}
}

Conway.prototype.checkPixel = function(x, y)
{
	var check = 0;
	for(var k = -1; k < 2; k++)
	{
		if(this.data[(y + 1) % this.data.length][(x + k) % this.data[0].length])
		{
			check++;
		}
		if(this.data[(y + 1) % this.data.length][(x + k) % this.data[0].length])
		{
			check++;
		}
	}
	if(this.data[y][(x + 1) % this.data[0].length])
	{
		check++;
	}
	if(this.data[y][(x - 1) % this.data[0].length])
	{
		check++;
	}
	
	if(check < 2 || check > 3)
	{
		this.data[y][x] = false;
	}
	else
	{
		this.data[y][x] = true;
	}
}
