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
		var result = [];
		result[0] = d[2];
		result[1] = d[3];
		result[2] = d[5];
		result[3] = d[6];

		return result;
	},

	buildD(dArray){
		var dString = 'M ' + dArray[0] + ' ' +  dArray[1] + ' L ' +  dArray[2] + ' ' + dArray[3]; 
		return dString;
	},

	changeStart(dArray, diff){
		dArray[0] = parseInt(dArray[0]) + parseInt(diff[0]);
		dArray[1] = parseInt(dArray[1]) + parseInt(diff[1]);
		return dArray;
	},

	changeEnd(dArray, diff){
		dArray[2] = parseInt(dArray[2]) + parseInt(diff[0]);
		dArray[3] = parseInt(dArray[3]) + parseInt(diff[1]);
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