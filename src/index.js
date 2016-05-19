var co = require('co');
var $ = require('jquery');


console.log('22 2  --33 - assaas');




function calculateMouseDiff(state){
	state.diff = [state.mouse[0] - state._prevMouse[0], state.mouse[1] - state._prevMouse[1]];
	return state;
}


function updateMousePrev(state){
	state._prevMouse = state.mouse;
	return state;
}

function setSelectedNode(state, node){
	state.selected = node;
	console.log(state);
	return state;
}

function moveSelectedNode(state){

	moveNode(state.selected, state.mouse);
	return state;
}

function moveNode(node, coords){
	var element = $('#'.node);
	console.log(node, coords, element);
	element.attr('x', coords[0]);
	element.attr('y', coords[1]);
}

console.log('init5');

$().ready(() => {


	var state = {
		_prevMouse: [0,0], 
		mouse: [0,0],
		diff: [0,0],
		drag: false,
		selected: null
	};


	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
		//console.log(state.mouse);
	});

	$('.node').click(e => {
		var id = e.target.id;
		state = setSelectedNode(state, id);
	});


	var fps = (lastValue) => new Promise(resolve => {
		
		setTimeout(() => {resolve(true);}, 1000);
	});

	co(function * () {
	  	
		while (yield fps()){
			state = calculateMouseDiff(state);
			state = moveSelectedNode(state);
			state = updateMousePrev(state);
		}


	  return result;
	}).then(function (value) {
	  console.log(value);
	}, function (err) {
	  console.error(err.stack);
	});


});