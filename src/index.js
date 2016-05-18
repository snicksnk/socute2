var co = require('co');
var $ = require('jquery');


$().ready(() => {


	var state = {
		_prevMouse: [0,0], 
		mouse: [0,0],
		diff: [0,0],
		drag: false,
		selected: null
	};


	function calculateMouseDiff(state){
		state.diff = [state.mouse[0] - state._prevMouse[0], state.mouse[1] - state._prevMouse[1]];
		return state;
	}

	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
		//console.log(state.mouse);
	});


	var fps = (lastValue) => new Promise(resolve => {
		console.log('fps')
		setTimeout(() => {resolve(true);}, 500);
	});

	co(function * () {
	  console.log('---==-')
	  	
	  	var rect = $('#rect');
		while (yield fps()){

			state = calculateMouseDiff(state);

			console.log(state.mouse, state.diff);

			rect.attr('x', state.mouse[0]);
			rect.attr('y', state.mouse[1]);

			state._prevMouse = state.mouse;
		}


	  return result;
	}).then(function (value) {
	  console.log(value);
	}, function (err) {
	  console.error(err.stack);
	});


});