var Node = require('./node.js');
var Text = require('./text.js');
var Line = require('./line.js');
var Img = require('./image.js');
var _   = require('underscore');

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


  		canvas.appendChild(node);
	  	canvas.appendChild(text);



	  	_.each(icons, icon => {
	  		console.log(icon);
	  		let iconImage = Img.create(idMaker(), icon, [15, 15]);

		  	canvas.appendChild(iconImage);
		  	elements.push(iconImage);
	  	});


	  	elements.push(text);
	  	elements.unshift(node);

  		node = Node.stretchToText.apply(null, elements);
	  	Text.assignToNode.apply(null, elements);
	  	
	  	return node;
	},

	setParentNode(parentNode, node){
		Node.setParent(node, parentNode);
	  	var line = Line.create(parentNode, node);
	  	canvas.appendChild(line);
	  	return node; 
	}

}

module.exports = MM;