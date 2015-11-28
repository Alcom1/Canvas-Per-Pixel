function ObjSpr(x, y, sprite, scale)
{
	Obj.call(
		this,
		x,
		y,
		scale);
	
	this.sprite = sprite;
}

ObjSpr.prototype = Object.create(Obj.prototype);

ObjSpr.prototype.draw = function(ctx)
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