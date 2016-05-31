var Node = require('./node.js');
var Text = require('./text.js');
var Line = require('./line.js');

var MM = {

	createRootNode(idMaker, text, canvas){
		var node = Node.create(idMaker());
		var text = Text.create(idMaker(), text);

		canvas.appendChild(node);
		canvas.appendChild(text);

		Node.setParent
	},

	createNode(idMaker, caption, canvas){
		
		console.log(idMaker());
	  	var node = Node.create(idMaker());
	  	var text = Text.create(idMaker(), caption);

	  	//var state = Node.bindSelect(state, node);

	  	canvas.appendChild(node);
	  	canvas.appendChild(text);
	  	node = Node.stretchToText(node, text);

	  
	  	text =Text.assignToNode(node, text);
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