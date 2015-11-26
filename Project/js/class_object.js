var Obj = function(x, y, sprite, scale)
{
	this.pos = new Vect(x, y, 0);
	this.sprite = sprite;
	this.scale = scale;
}

Obj.prototype.draw = function(ctx)
{
	ctx.save();
	ctx.drawImage(
		this.sprite, 
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