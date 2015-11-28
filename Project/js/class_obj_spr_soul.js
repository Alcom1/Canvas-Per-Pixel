function Soul(x, y, sprite, scale)
{
	ObjSpr.call(
		this,
		x,
		y,
		sprite,
		scale);
	
	this.speed = 100;
}

Soul.prototype = Object.create(ObjSpr.prototype);

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