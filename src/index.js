var co = require('co');
var $ = require('jquery');

var Node = require('./node.js');
var State = require('./state.js');

console.log('22 2  --33 - assaas');




$().ready(() => {


	var state = State.getInitial();


	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
	});


	$('.node').mousedown(e => {
		console.log('down');
		var id = e.target.id;
		state = State.setSelectedNode(state, id);
	});



	$('.node').mouseup(e => {
		var id = e.target.id;
		state = State.unselectNode(state);
	});

	var fps = (lastValue) => new Promise(resolve => {
		
		setTimeout(() => {resolve(true);}, 100);
	});

	co(function * () {
	  	
		while (yield fps()){
			state = State.calculateMouseDiff(state);
			state = Node.moveSelected(state);
			state = State.updateMousePrev(state);
		}


		return result;
	}).then(function (value) {
	  console.log(value);
	}, function (err) {
	  console.error(err.stack);
	});


});