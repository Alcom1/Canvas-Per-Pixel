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
	this.time = .08;
	this.counter = 0;
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

Conway.prototype.createGlider = function(x, y, flipX, flipY)
{
	this.data[(y + 0 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 1 * flipY).mod(this.data.length)][(x + 1 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 1 * flipY).mod(this.data.length)][(x + 2 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 2 * flipY).mod(this.data.length)][(x + 0 * flipX).mod(this.data[0].length)] = true;
	this.data[(y + 2 * flipY).mod(this.data.length)][(x + 1 * flipX).mod(this.data[0].length)] = true;
}

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


Conway.prototype.update = function(dt)
{
	this.counter += dt;
	console.log(this.counter);
	
	if(this.counter > this.time)
	{
		this.counter = this.counter - this.time;
		
		var newData = [];
		
		for (var i = 0; i < this.data.length; i++)
		{
			newData[i] = this.data[i].slice();
		}
		
		for(var j = 0; j < this.data.length; j++)
		{
			for(var i = 0; i < this.data[0].length; i++)
			{
				newData[j][i] = this.checkPixel(j, i);
			}
		}
		
		this.data = newData;
	}
}

Conway.prototype.checkPixel = function(j, i)
{
	var check = 0;
	for(var k = 0; k < 8; k++)
	{
		if(this.data
			[(j + squareLoop[k][0]).mod(this.data.length)]
			[(i + squareLoop[k][1]).mod(this.data[0].length)])
		{
			check++;
		}
	}
	
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
