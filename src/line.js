var $ = require('jquery');
var Selector = require('./selector');
var attr 	 = Selector.attr;


var Line = {

	create(parentNode, childrenNode){

		var parentId =	Selector.getId(parentNode),
		childrenId 	 = 	Selector.getId(childrenNode);
		var parentCoords = [Selector.attr(parentNode, 'x'), Selector.attr(parentNode, 'y')];
	
		var childrenCoords = [Selector.attr(childrenNode, 'x'), Selector.attr(childrenNode, 'y')];




		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var path = document.createElementNS(svgNS,'path');


        var parentNodePoint = Line.getRightPoint(parentNode);
        var childrenNodePoint = Line.getLeftPoint(childrenNode);
        var lineId = 'line-' + Selector.getId(parentNode) + '-'+ Selector.getId(childrenNode);


      	path = Selector.setAttr(path, 'id', lineId);
      	path = Selector.setAttr(path, 'fill', "#9DE281");
  		path = Selector.setAttr(path, 'd', 'M ' + parentNodePoint.join(' ') + ' L ' + childrenNodePoint.join(' '));
        path = Selector.appendAttr(path, 'class', 'startat-' + parentId);
        path = Selector.appendAttr(path, 'class', 'endat-' + childrenId);
        path = Selector.setAttr(path, 'fill', "#9DE281");
		path = Selector.setAttr(path, 'stroke-width', "3");
        path = Selector.setAttr(path, 'stroke', "#FDD000");




      	Line.changeStart(path, parentCoords);
      	
      	Line.changeEnd(path, childrenCoords);

      	return path;
	},



    getLeftPoint(node){
        var nodeX = attr(node, 'x'),
            nodeY = attr(node, 'y'),
            nodeH = attr(node, 'height');

        return [Math.round(nodeX), Math.round(nodeY + (nodeH / 2))];
    },

    getRightPoint(node){
        var nodeX = attr(node, 'x'),
            nodeY = attr(node, 'y'),
            nodeH = attr(node, 'height'),
            nodeW = attr(node, 'width');
 	
        return [Math.round(nodeX + nodeW),  Math.round(nodeY + (nodeH / 2)) ];
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
		dArray[1] = parseInt(dArray[1]) + parseInt(diff[0]);
		dArray[2] = parseInt(dArray[2]) + parseInt(diff[1]);
		return dArray;
	},

	changeEnd(dArray, diff){
		dArray[4] = parseInt(dArray[4]) + parseInt(diff[0]);
		dArray[5] = parseInt(dArray[5]) + parseInt(diff[1]);
		return dArray;
	},

	moveLineStart(parentNode, diff){
		
		$('.startat-' + Selector.getId(parentNode)).each((n, e) => {
			var d = Line.parseD(e.getAttribute('d'));
			d = Line.changeStart(d, diff);
			e.setAttribute('d', Line.buildD(d));
		});

		/*$('.endat-' + parentNode).each((n, e) => {
			var d = Line.parseD(e.getAttribute('d'));
			d = Line.changeEnd(d, diff);
			e.setAttribute('d', Line.buildD(d));
		});*/
	},

	moveLineEnd(childrenNode, diff){
		/*
		$('.startat-' + parentNode).each((n, e) => {
			var d = Line.parseD(e.getAttribute('d'));
			d = Line.changeStart(d, diff);
			e.setAttribute('d', Line.buildD(d));
		});
		*/
		$('.endat-' + Selector.getId(childrenNode)).each((n, e) => {
			var d = Line.parseD(e.getAttribute('d'));
			d = Line.changeEnd(d, diff);
			e.setAttribute('d', Line.buildD(d));
		});
	}
};
module.exports = Line;