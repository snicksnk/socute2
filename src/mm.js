var Node = require('./node.js');
var Text = require('./text.js');
var Line = require('./line.js');
var Img = require('./image.js');
var _   = require('underscore');
var $   = require('jquery');
var Selector = require('./selector');

var MM = {

	createRootNode(idMaker, text, canvas){
		var node = Node.create(idMaker());
		var text = Text.createForeign(idMaker(), text);

		canvas.appendChild(node);
		canvas.appendChild(text);

		Node.setParent
	},

	createNode(idMaker, caption, icons, canvas){
	  	var node = Node.create(idMaker()),
	  	  	text = Text.create(idMaker(), caption),
	  		elements = [];
	  		//helperNode = MM.createHelperNode(idMaker, node);


  		canvas.appendChild(node);
	  	canvas.appendChild(text);



	  	_.each(icons, icon => {
	  		console.log(icon);
	  		let iconImage = Img.create(idMaker(), icon, [15, 15]);

		  	canvas.appendChild(iconImage);
		  	elements.push(iconImage);
	  	});



	  	elements.push(text);
	  	//elements.push(helperNode);
	  	elements.unshift(node);

  		node = Node.stretchToText.apply(null, elements);
	  	Text.assignToNode.apply(null, elements);

	  	
	  
	  	
	  	return node;
	},

	createHelperNode(idMaker, parentNode){
		var node = Node.create(idMaker())
			text = Text.create(idMaker(), '+');

		canvas.appendChild(node);
		canvas.appendChild(text);

		Node.stretchToText(node, text);
		Text.assignToNode(node, text);

		//MM.setParentNode(parentNode, node, false);


		return node;
	},

	setParentNode(parentNode, node, line = true){
		Node.setParent(node, parentNode);
		if (line){
		  	var line = Line.create(parentNode, node);
		  	canvas.appendChild(line);
	  	} else {

	  	}
	  	return node; 
	},

	serialize(parentNode){
		var dump = [];
		$('#canvas').children().each((n, elm) => {
			var classes = Selector.getClasses(elm);
			for (cls of classes){
				dump.push(Selector.getDumpOfElement(elm));
			}
		});

		console.log(dump);
	}

}

module.exports = MM;