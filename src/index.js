var co = require('co');
var $ = require('jquery');

var Node = require('./node.js');
var State = require('./state.js');


$().ready(() => {
	var state = State.getInitial();

	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
	});


	var bindSelect = elm => $(elm).mousedown(e => {
		console.log(elm);
		var id = e.target.id;
		state = State.setSelectedNode(state, id);
	});

	bindSelect('.node');

	var bindUnselect = elm => $(elm).mouseup(e => {
		var id = e.target.id;
		state = State.unselectNode(state);
	});

	bindUnselect('.node');

	var frameN = 0;
	setInterval( () => {
		console.log(frameN / 2);
		frameN = 0;
	}, 1000);

	var fps = (lastTime) => {
		var startTime = new Date().getTime();
		


		return new Promise(resolve => {
			var minFrameTime = 30;

			var currentTime = new Date().getTime();
			var timeFromLastFrame = currentTime - lastTime;

			
			var delayTime = minFrameTime - timeFromLastFrame;

			if (delayTime < 0){
				delayTime = 0;
			}

			frameN++; 


			setTimeout(() => {resolve(currentTime);}, delayTime);
		})}
	;

	co(function * () {
	  	var lastValue = 0;

	  	var canv = $("#canvas")[0];
	  	var node = Node.create('assasa');
	  	
	  	//var state = Node.bindSelect(state, node);
	  	
	  	canv.appendChild(node);
	  	bindSelect(node);
	  	bindUnselect(node);

		while (lastValue = yield fps(lastValue)){
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