function Soul(x, y, sprite, scale)
{
	Obj.call(
		this,
		x,
		y,
		sprite,
		scale);
	
	this.speed = 100;
}

Soul.prototype = Object.create(Obj.prototype);

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

Soul.prototype.limit = function(bbox)
{
	if(this.pos.x < bbox.pos.x + 5)
	{
		this.pos.x = bbox.pos.x + 5;
	}
	if(this.pos.y < bbox.pos.y + 5)
	{
		this.pos.y = bbox.pos.y + 5;
	}
	if(this.pos.x + this.sprite.width > bbox.pos.x + bbox.sprite.width - 5)
	{
		this.pos.x = bbox.pos.x + bbox.sprite.width - 5 - this.sprite.width;
	}
	if(this.pos.y + this.sprite.height > bbox.pos.y + bbox.sprite.height - 5)
	{
		this.pos.y = bbox.pos.y + bbox.sprite.height - 5 - this.sprite.height;
	}
}