var $ = require('jquery');

var Line = {
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