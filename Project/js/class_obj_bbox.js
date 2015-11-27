function Bbox(x, y, width, height, scale)
{
	Obj.call(
		this,
		x, 
		y,
		getBboxSprite(width, height), 
		scale);
}

Bbox.prototype = Object.create(Obj.prototype);

function getBboxSprite(width, height)
{	
	var subCanvas = document.createElement('canvas');
	subCanvas.width = width;
	subCanvas.height = height;
	var subCtx = subCanvas.getContext('2d');
	
	subCtx.fillStyle = "#FFF";
	subCtx.fillRect(
		0,
		0,
		subCanvas.width,
		subCanvas.height);
	
	subCtx.clearRect(
		5, 
		5, 
		subCanvas.width - 10, 
		subCanvas.height - 10);
	
	var sprite = new Image();
	sprite.src = subCanvas.toDataURL("image/png");
	
	return sprite;
}