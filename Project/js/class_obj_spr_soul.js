function Soul(x, y, sprite, spriteDmg, scale)
{
	ObjSpr.call(
		this,
		x,
		y,
		sprite,
		scale);
	
	this.dmg = false;
	this.spriteDmg = spriteDmg;
	this.speed = 100;
}

Soul.prototype = Object.create(ObjSpr.prototype);

Soul.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.drawImage(
		this.dmg ? this.spriteDmg : this.sprite,
		0, 
		0,
		this.sprite.width,
		this.sprite.height,
		this.pos.x,
		this.pos.y,
		this.sprite.width * this.scale,
		this.sprite.height * this.scale);
	ctx.restore();
}

Soul.prototype.getCollision = function(ctx)
{
	this.colData = []
	this.draw(ctx);
	var imgData = ctx.getImageData(
		this.pos.x,
		this.pos.y,
		this.sprite.width,
		this.sprite.height);
	
	for(var j = 0; j < imgData.height; j++)
	{
		for(var i = 0; i < imgData.width; i++)
		{
			if(imgData.data[(j * imgData.width + i) * 4])
			{
				this.colData.push((j * imgData.width + i) * 4);
			}
		}
	}
}

Soul.prototype.checkCollision = function(ctx)
{
	var imgData = ctx.getImageData(
		this.pos.x,
		this.pos.y,
		this.sprite.width,
		this.sprite.height);
	
	for(var i = 0; i < this.colData.length; i++)
	{
		if(imgData.data[this.colData[i] + 3])
		{
			this.dmg = true;
			return;
		}
	}
	
	this.dmg = false;
}

Soul.prototype.move = function(dt)
{
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_UP])
	{
		this.pos.y -= Math.round(this.speed * dt);
	}
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_RIGHT])
	{
		this.pos.x += Math.round(this.speed * dt);
	}
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_DOWN])
	{
		this.pos.y += Math.round(this.speed * dt);
	}
	if(myKeys.keydown[myKeys.KEYBOARD.KEY_LEFT])
	{
		this.pos.x -= Math.round(this.speed * dt);
	}
}

Soul.prototype.limit = function(bound)
{
	if(this.pos.x < bound[0])
	{
		this.pos.x = bound[0];
	}
	if(this.pos.y < bound[1])
	{
		this.pos.y = bound[1];
	}
	if(this.pos.x + this.sprite.width > bound[2])
	{
		this.pos.x = bound[2] - this.sprite.width;
	}
	if(this.pos.y + this.sprite.height > bound[3])
	{
		this.pos.y = bound[3] - this.sprite.height;
	}
}