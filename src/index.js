var co = require('co');
var $ = require('jquery');

var MM   = require('./mm.js');
var Node = require('./node.js');
var Text = require('./text');
var State = require('./state.js');
var Line = require('./line.js')


$().ready(() => {
	var state = State.getInitial();

	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
	});


	var bindSelect = elm => $(elm).mousedown(e => {
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

	var fpsDisp = $('#fps');
	setInterval( () => {
		fpsDisp.html('fps ' + (frameN / 2));
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

	  	
	  	console.log(state);

	  	var idMaker = () => {
	  		state = State.incrementId(state);
	  		return State.getCurrentId(state);
	  	};

	  	var newId = State.getCurrentId(state);
	  	var node1 = $('#node-1000')[0];	
	  	var canv = $("#canvas")[0];

	  	var rootNode = MM.createNode(idMaker, 'Root', canvas);
  		MM.setParentNode(node1, rootNode);

	  	var nodeTwo = MM.createNode(idMaker, 'Two', canvas);
	  	  	MM.setParentNode(node1, nodeTwo)


	  	var node = MM.createNode(idMaker, 'childrend', canvas);
	  	MM.setParentNode(node1, node)

	  	//Node.manualMoveByDiff(node, [100, 100])



	  	bindSelect(rootNode);
	  	bindUnselect(rootNode);

	  	bindSelect(node);
	  	bindUnselect(node);


	  	bindSelect(nodeTwo);
	  	bindUnselect(nodeTwo);


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