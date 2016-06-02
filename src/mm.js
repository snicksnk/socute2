var Node = require('./node.js');
var Text = require('./text.js');
var Line = require('./line.js');
var Img = require('./image.js');

var MM = {

	createRootNode(idMaker, text, canvas){
		var node = Node.create(idMaker());
		var text = Text.createForeign(idMaker(), text);

		canvas.appendChild(node);
		canvas.appendChild(text);

		Node.setParent
	},

	createNode(idMaker, caption, iconsCaption, canvas){
	  	var node = Node.create(idMaker());
	  	var icons = Img.create(idMaker(), '/images/icons/png/database-1.png', [10, 10]);

	  	var icons2 = Img.create(idMaker(), '/images/icons/png/database-1.png', [10, 10]);
	  	var icons3 = Img.create(idMaker(), '/images/icons/png/database-1.png', [10, 10]);
	  
	  	//var icons = Text.create(idMaker(), iconsCaption, 'icon');
	  	var text = Text.create(idMaker(), caption);

	  	//var state = Node.bindSelect(state, node);
	  	//TODO Need for getBBox()
	  	canvas.appendChild(node);
	  	canvas.appendChild(text);
	  	canvas.appendChild(icons);
	  	canvas.appendChild(icons2);
	  	canvas.appendChild(icons3);

	  	node = Node.stretchToText(node, icons, icons2,icons3, text);

	  
	  	Text.assignToNode(node, icons, icons2,icons3, text);
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