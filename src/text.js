var Selector = require('./selector');
var attr = Selector.attr;

var Text = {
    create(id, value){
    	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var text = document.createElementNS(svgNS,'text');
        text.setAttribute('x', 0);
        text.setAttribute('y', 0);
        text.setAttribute('id', id);


        var textNode = document.createTextNode(value);
        text.appendChild(textNode);
        return text;
    },

    assignToNode(parentNode, text){
		var parentId = Selector.getId(parentNode);
		var classes = text.getAttribute('class');
        text.setAttribute('class',  classes + ' ' + parentId + '-text' + ' ' + 'depends-' + parentId);
        text.setAttribute('y', 200);
        Text.locateToNode(parentNode, text);

        return text;
    },

    locateToNode(parentNode, text){
    	var leftOffset = 10
        bottomOffset = 10,
        parentX = attr(parentNode, 'x'),
        parentY = attr(parentNode, 'y'),
        parentH = attr(parentNode, 'height'),
        parentW = attr(parentNode, 'width'),
        textBox = text.getBBox(),
        textH = parseInt(textBox.height),
        textW = parseInt(textBox.width);

        text.setAttribute('x', parentX + leftOffset);
        text.setAttribute('y', parentY +  (parentH / 2) + (textH / 4));

        return text;
    },

    setParent(parentNode, childrenNode){
        var parentId = Selector.getId(parentNode);
        var childrenClass = 'depends-node-' + parentId;

    }
};


module.exports = Text;