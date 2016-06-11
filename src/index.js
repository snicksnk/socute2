var co = require('co'),
	$ = require('jquery'),
	MM   = require('./mm.js'),
	Node = require('./node.js'),
	Text = require('./text'),
	State = require('./state.js'),
	Line = require('./line.js'),
	Bacon = require('baconjs'),
	Fps   = require('./fps.js');


$().ready(() => {



	var state = State.getInitial();


  	function idMaker() {
  		state = State.incrementId(state);
  		return State.getCurrentId(state);
  	}

  	//No FRP for better perfomance
	$('body').mousemove(event => {
		state.mouse = [event.pageX, event.pageY];
	});



	function createNode(){
		var canvas = $("#canvas")[0],
			activeNodeId = State.getActiveNode(state),
			activeNode = $('#' + activeNodeId)[0],
			caption = prompt('entet text'),
			newNode = MM.createNode(idMaker, caption, [], canvas);
			
		MM.setParentNode(activeNode, newNode);
		bindElement(newNode);
	}

	var keyDownStrim = Bacon.fromEvent($(document), 'keydown');

	keyDownStrim
		.filter(e => e.keyCode == 9)
		.onValue(createNode)

	

	function selectNode(node) {
		var id = $(node).attr('id');
		$('.node').removeClass('active');
		$(node).addClass('active');
		state = State.setSelectedNode(state, id);
		state = State.setActiveNode(state, id);
	}

	function unselectNode(){
		state = State.unselectNode(state);
	}

	var mouseDownStrim = Bacon.fromEvent($('#canvas'), 'mousedown');
	var mouseUpStrim   = Bacon.fromEvent($('#canvas'), 'mouseup');


	mouseDownStrim
		.map(e => $(e.target))
		.filter(elm => elm.hasClass('node'))
		.onValue(elm => selectNode(elm));

	mouseUpStrim.onValue(unselectNode);

	var fpsCont = $('#fps');

	var fps = Fps(rate => fpsCont.html('FPS ' + rate));


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

	  	Node.manualMoveByDiff(node1, [50, 50]);
	  	Node.manualMoveByDiff(node, [500,50]);
	  	Node.manualMoveByDiff(nodeNew, [150, 50]);
	  	Node.manualMoveByDiff(rootNode, [500,150]);
	  	Node.manualMoveByDiff(nodeTwo, [500,200]);


	  	MM.serialize();



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