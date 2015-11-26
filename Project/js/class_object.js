var Object = function(x, y, sprite)
{
	this.pos = new Vect(x, y, 0);
	this.sprite = sprite;
}

Object.prototype.draw = function(ctx, scale)
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
		this.sprite.width * scale,
		this.sprite.height * scale);
	ctx.restore();
}