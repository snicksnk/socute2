var co = require('co');
var $ = require('jquery');

var MM   = require('./mm.js');
var Node = require('./node.js');
var Text = require('./text');
var State = require('./state.js');
var Line = require('./line.js')


$().ready(() => {
	var state = State.getInitial();

  	var idMaker = () => {
  		state = State.incrementId(state);
  		return State.getCurrentId(state);
  	};

	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
	});

	$(document).keydown(function(e) {
		console.log(state);
		var canvas = $("#canvas")[0];
		var activeNodeId = State.getActiveNode(state);
		var activeNode = $('#' + activeNodeId)[0];


  		if (e.keyCode == 9){
  			var caption = prompt('entet text');
  			var newNode = MM.createNode(idMaker, caption, [], canvas);
  			MM.setParentNode(activeNode, newNode);
	  		bindElement(newNode);
  		}
	});


	var bindSelect = elm => $(elm).mousedown(e => {
		var id = e.target.id;
		$('.node').removeClass('active');
		$('#' + id).addClass('active');
		state = State.setSelectedNode(state, id);
		state = State.setActiveNode(state, id);
	});

	bindSelect('.node');

	var bindUnselect = elm => $(elm).mouseup(e => {
		var id = e.target.id;
		state = State.unselectNode(state);
	});

	var bindElement  = (elm) => {
		bindSelect(elm);
		bindUnselect(elm);
	};

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


	  	var newId = State.getCurrentId(state);
	  	var node1 = MM.createNode(idMaker, 'MainRoot', ['/images/icons/png/radar.png'], canvas);//$('#node-1000')[0];	
	  	var canv = $("#canvas")[0];

	  	var rootNode = MM.createNode(idMaker, 'Root', ['/images/icons/png/database-1.png'], canvas);
  		MM.setParentNode(node1, rootNode);

	  	var nodeTwo = MM.createNode(idMaker, 'Two', [], canvas);
	  	MM.setParentNode(node1, nodeTwo);

	  	var node = MM.createNode(idMaker, 'childrend', [], canvas);
	  	MM.setParentNode(node1, node);

	  	var nodeNew = MM.createNode(idMaker, 'subChildren', ['/images/icons/png/repeat-1.png', '/images/icons/png/route.png'], canvas);
	  	MM.setParentNode(node, nodeNew);


	  	//Node.manualMoveByDiff(node, [100, 100])


	  	bindElement(node1);
	  	bindElement(rootNode);
	  	bindElement(node);
	  	bindElement(nodeTwo);
	  	bindElement(nodeNew);

	  	Node.manualMoveByDiff(node1, [50, 50]);
	  	Node.manualMoveByDiff(node, [500,50]);
	  	Node.manualMoveByDiff(nodeNew, [150, 50]);
	  	Node.manualMoveByDiff(rootNode, [500,150]);
	  	Node.manualMoveByDiff(nodeTwo, [500,200]);



		while (lastValue = yield fps(lastValue)){
			state = State.calculateMouseDiff(state);
			state = Node.moveSelected(state);
			state = State.updateMousePrev(state);
		}


		return result;
	}).then(function (value) {
	  console.log(value);
	});


});