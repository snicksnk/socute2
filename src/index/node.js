function moveSelectedNode(state){
	var mousePos = state.mouse;
	var mouseDiff = state.diff; 
	var selectedNode = state.selected;

	moveNodeByDiff(selectedNode, mouseDiff);
	moveDependedNodes(selectedNode, mouseDiff);
	moveDependedLines(selectedNode, mouseDiff);
	return state;
}

function moveNode(node, coords){
	var id = '#' + node;
	var element = $(id);
	element.attr('x', coords[0] - 20);
	element.attr('y', coords[1] - 20);

}

function moveNodeByDiff (node, diffs) {
	var id = '#' + node;
	var element = $(id);
	element.attr('x', parseInt(element.attr('x')) + diffs[0]);
	element.attr('y', parseInt(element.attr('y')) + diffs[1]);
}

function moveDependedNodes(parentNode, diff) {
	$('.depends-' + parentNode).each((n, e) => {
		var dependId = $(e).attr('id');
		console.log(diff);
		moveNodeByDiff(dependId, diff);
	});
}


//Selecetd
function setSelectedNode(state, node){
	state.selected = node;
	return state;
}

