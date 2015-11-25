var object = function(x, y, sprite)
{
	this.pos = new Vect(x, y, 0);
	this.sprite = sprite;
}

Object.prototype.draw = function(ctx, scale)
{
	this.ctx.save();
	this.ctx.drawImage(
		this.testImage, 
		0, 
		0,
		this.testImage.width,
		this.testImage.height,
		this.pos.x,
		this.pos.y,
		this.sprite.width,
		this.sprite.height);
	this.ctx.restore();
}