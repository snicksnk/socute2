var $ = require('jquery');
var Selector = require('./selector');

var Line = {

	create(parentNode, childrenNode){

		var parentId =	Selector.getId(parentNode),
		childrenId 	 = 	Selector.getId(childrenNode);
		console.log('---');
		var parentCoords = [Selector.attr(parentNode, 'x'), Selector.attr(parentNode, 'y')];
	
		var childrenCoords = [Selector.attr(childrenNode, 'x'), Selector.attr(childrenNode, 'y')];




		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var path = document.createElementNS(svgNS,'path');
      	
  		path = Selector.setAttr(path, 'd', 'M 0 0 L 100 100');
        path = Selector.appendAttr(path, 'class', 'startat-' + parentId);
        path = Selector.appendAttr(path, 'class', 'endat-' + childrenId);
        path = Selector.setAttr(path, 'fill', "#9DE281");
		path = Selector.setAttr(path, 'stroke-width', "3");
        path = Selector.setAttr(path, 'stroke', "#FDD000");




      	Line.changeStart(path, parentCoords);
      	
      	console.log(path);
      	Line.changeEnd(path, childrenCoords);

      	return path;
	},

	parseD(dString){
		var parse = /(M)\s([\-]?\d+)+\s([\-]?\d+)\s(L)\s([\-]?\d+)\s([\-]?\d+)/;
		var d = parse.exec(dString);
		return d.slice(1,d.length);
	},

	buildD(dArray){
		var dString = dArray.join(' ');
		return dString;
	},

	changeStart(dArray, diff){
		dArray[1] = parseInt(dArray[1]) + diff[0];
		dArray[2] = parseInt(dArray[2]) + diff[1];

		dArray = Line.changeEnd(dArray, diff);
		return dArray;
	},

	changeEnd(dArray, diff){
		dArray[4] = parseInt(dArray[4]) + diff[0];
		dArray[5] = parseInt(dArray[5]) + diff[1];
		return dArray;
	},

	moveDepended(parentNode, diff){
		
		$('.startat-' + parentNode).each((n, e) => {
			var d = Line.parseD(e.getAttribute('d'));
			d = Line.changeStart(d, diff);
			e.setAttribute('d', Line.buildD(d));
		});

		$('.endat-' + parentNode).each((n, e) => {
			var d = Line.parseD(e.getAttribute('d'));
			d = Line.changeEnd(d, diff);
			e.setAttribute('d', Line.buildD(d));
		});

	}
};
module.exports = Line;