var $ = require('jquery');
var Line = require('./line');

var Node = {
	moveSelected(state){
		var mousePos = state.mouse;
		var mouseDiff = state.diff; 
		var selectedNode = state.selected;

		Node.moveByDiff(selectedNode, mouseDiff);
		Node.moveDepended(selectedNode, mouseDiff);
		Line.moveDepended(selectedNode, mouseDiff);
		return state;
	},

	move(node, coords){
		var id = '#' + node;
		var element = $(id);
		element.attr('x', coords[0] - 20);
		element.attr('y', coords[1] - 20);
	},

	moveByDiff (node, diffs) {
		var id = '#' + node;
		var element = $(id);
		element.attr('x', parseInt(element.attr('x')) + diffs[0]);
		element.attr('y', parseInt(element.attr('y')) + diffs[1]);
	},

 	moveDepended(parentNode, diff) {
		$('.depends-' + parentNode).each((n, e) => {
			var dependId = $(e).attr('id');
			Node.moveByDiff(dependId, diff);
		});
	}

}



module.exports = Node;