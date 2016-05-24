var $ = require('jquery');
var Line = require('./line');

var Node = {
    create(svgCanvas, text){
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
        rect.setAttribute('id', 'node-100');

        
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

    bindSelect(state, node){
        $(node).mousedown(e => {
            console.log('click');
            var id = e.target.id;
            state = State.setSelectedNode(state, id);
        });
        console.log(state)
        return state;
    }
}



module.exports = Node;