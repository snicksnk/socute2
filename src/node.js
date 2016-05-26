var $ = require('jquery');
var Line = require('./line');
var Selector = require('./selector');
var attr = Selector.attr;
var setAttr = Selector.setAttr;


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

        Node.moveByDiff(selectedNode, mouseDiff);
        Node.moveDepended(selectedNode, mouseDiff);
        Line.moveDepended(selectedNode, mouseDiff);
        return state;
    },

    move(node, coords){
        var id = '#' + node;
        var element = $(id);
        element.attr('x', coords[0] - 20);
        element.attr('y', coords[1] - 20);
    },

    moveByDiff (node, diffs) {
        var id = '#' + node;
        var element = $(id);
        element.attr('x', parseInt(element.attr('x')) + diffs[0]);
        element.attr('y', parseInt(element.attr('y')) + diffs[1]);
    },

    moveDepended(parentNode, diff) {
        $('.depends-' + parentNode).each((n, e) => {
            var dependId = $(e).attr('id');
            Node.moveByDiff(dependId, diff);
        });
    },

    stretchToText(node, text){
        var leftOffset = 10
        bottomOffset = 10,
        textBox = text.getBBox(),
        textH = parseInt(textBox.height),
        textW = parseInt(textBox.width);

        
        var nodeWidth = leftOffset * 2 + textW;
        var nodeHeight = bottomOffset * 2 + textH;

        console.log(nodeWidth, nodeHeight, textW)
        setAttr(node, 'width', nodeWidth);
        setAttr(node, 'height', nodeHeight);

        return node;
    }
}



module.exports = Node;