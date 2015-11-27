function Soul(x, y, sprite, scale)
{
	Obj.call(
		this,
		x,
		y,
		sprite,
		scale);
}

Soul.prototype = Object.create(Obj.prototype);