var co = require('co');
var $ = require('jquery');

var Node = require('./node.js');
var State = require('./state.js');


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

	var fps = (lastTime) => {
		var startTime = new Date().getTime();
		var frameN = 0;

		setInterval(console.log('frame rate', frameN), 1000);

		return new Promise(resolve => {
			var minFrameTime = 10;

			var currentTime = new Date().getTime();
			var timeFromLastFrame = currentTime - lastTime;

			
			var delayTime = minFrameTime - timeFromLastFrame;

			if (delayTime < 0){
				delayTime = 1;
			}

			frameN++; 
			console.log(frameN);


			setTimeout(() => {resolve(currentTime);}, delayTime);
		})}
	;

	co(function * () {
	  	var lastValue = 0;
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