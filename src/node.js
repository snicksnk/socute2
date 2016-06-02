var $ = require('jquery');
var Line = require('./line');
var Selector = require('./selector');
var attr = Selector.attr;
var setAttr = Selector.setAttr;
var appendAttr = Selector.appendAttr;


var Node = {
    create(id){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var rect = document.createElementNS(svgNS,'rect');


        rect.setAttribute('class','node');
        rect.setAttribute('width',100);
        rect.setAttribute('height',50);
        rect.setAttribute('x',0);
        rect.setAttribute('y',0);   
        rect.setAttribute('rx',15);
        rect.setAttribute('ry',15);
        rect.setAttribute('id', 'node-' + id);
        return rect;        
    },

    moveSelected(state){
        var mousePos = state.mouse;
        var mouseDiff = state.diff; 
        var selectedNode = state.selected;

        if (selectedNode){
	        Node.moveByDiff(selectedNode, mouseDiff);
	        Node.moveDepended(selectedNode, mouseDiff);	
        }
        //Line.moveDepended(selectedNode, mouseDiff);
        return state;
    },

    move(node, coords){
        var id = '#' + Selector.getId(node);
        var element = $(id);
        element.attr('x', coords[0] - 20);
        element.attr('y', coords[1] - 20);
        return node;
    },

    moveByDiff (node, diffs) {
        var id = '#' + Selector.getId(node);
        var element = $(id);
        element.attr('x', parseInt(element.attr('x')) + diffs[0]);
        element.attr('y', parseInt(element.attr('y')) + diffs[1]);
        Line.moveLineStart(node, diffs);
        Line.moveLineEnd(node, diffs);
    },

    manualMoveByDiff (node, diffs){
    	Node.moveByDiff(Selector.getId(node), diffs);
	    Node.moveDepended(Selector.getId(node), diffs);	
    },

    moveDepended(parentNode, diff) {
        $('.depends-' + parentNode).each((n, e) => {
            var dependId = Selector.getId(e);
            //Line.moveParentLine(e, diff);
            Node.moveByDiff(dependId, diff);
            Node.moveDepended(dependId, diff);
        });
    },


    setParent(childrenNode, parentNode){
        console.log(parentNode)
        var childrenClass = 'depends-' + Selector.getId(parentNode);
        childrenNode = appendAttr(childrenNode, 'class', childrenClass);
        return childrenNode;
    },

    _icons(){

    },

    getTotalTextWidth(text1, text2, textN){
    	var totalWidth = 0,
        	totalHeight = 0;


        for (elm of arguments) {
        	let textBox = elm.getBBox(),
		        textH = parseInt(textBox.height),
		        textW = parseInt(textBox.width);

	        totalHeight += textH;
	        totalWidth  += textW; 
        }

        return [totalWidth, totalHeight];

    },

    stretchToText(node, icons, text){
        var leftOffset = 10
        bottomOffset = 10;


        var contentBox = Node.getTotalTextWidth(icons, text);

        
        var nodeWidth = leftOffset * 2 + contentBox[0];
        var nodeHeight = bottomOffset * 2 + contentBox[1];

        setAttr(node, 'width', nodeWidth);
        setAttr(node, 'height', nodeHeight);

        return node;
    }
}


console.log(Node);
module.exports = Node;