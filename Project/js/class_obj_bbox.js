function Bbox(x, y, width, height, scale)
{
	Obj.call(
		this,
		x, 
		y, 
		scale);
	this.width = width;
	this.height = height;
	this.speed = 200;
	this.newWidth = width;
	this.newHeight = height;
}

Bbox.prototype = Object.create(Obj.prototype);

Bbox.prototype.draw = function(ctx)
{	
	ctx.save();
	ctx.fillStyle = "#FFF";
	ctx.fillRect(
		this.pos.x - this.width / 2,
		this.pos.y - this.height / 2,
		this.width,
		this.height);
	
	ctx.clearRect(
		this.pos.x + 5 - this.width / 2, 
		this.pos.y + 5 - this.height / 2, 
		this.width - 10, 
		this.height - 10);
	ctx.restore();
}

Bbox.prototype.getBound = function()
{
	return [
		this.pos.x - this.width / 2 + 5,
		this.pos.y - this.height / 2 + 5,
		this.pos.x + this.width / 2 - 5,
		this.pos.y + this.height / 2 - 5];
}

Bbox.prototype.transition = function(dt)
{
	if(this.width < this.newWidth)
	{
		this.width += this.speed * dt;
	}
	if(this.height < this.newHeight)
	{
		this.height += this.speed * dt;
	}
	if(this.width > this.newWidth)
	{
		this.width -= this.speed * dt;
	}
	if(this.height > this.newHeight)
	{
		this.height -= this.speed * dt;
	}
	if(Math.abs(this.width - this.newWidth) < this.speed * dt)
	{
		this.width = this.newWidth;
	}
	if(Math.abs(this.height - this.newHeight) < this.speed * dt)
	{
		this.height = this.newHeight;
	}
}