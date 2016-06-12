var Selector = require('./selector'),
	attr     = Selector.attr;
var Geom = {
	makeRectangle(elms){
		var minX = 0,
			minY = 0, 
			maxX = 0,
			maxY = 0,
			width = 0
			height = 0;

		for (elm of elms){
			let x = attr(elm, 'x'),
				y = attr(elm, 'y'),
				box = elm.getBBox(),
				elmW = box.width,
				elmH = box.height;

			minX = (minX > x)?x:minX;
			minY = (minY > y)?y:minY;
			maxX = (maxX < x + elmW)?x + elmW:maxX;
			maxY = (maxY < y + elmH)?y + elmH:maxY;
		}

		width  = maxX - minX;
		height = maxY - minY;

		return {x: minX, y: minY, width, height};
	}
}

module.exports = Geom;