var Selector = require('./selector');
var attr = Selector.attr;

var Text = {
    create(id, value, type){
    	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var text = document.createElementNS(svgNS,'text');
        text.setAttribute('x', 0);
        text.setAttribute('y', 0);
        text.setAttribute('id', id);
        if (type){
            text.setAttribute('class', 'type-' + type);
        }

        var textNode = document.createTextNode(value);
        text.appendChild(textNode);
        return text;
    },

    createForeign(id, content){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var foreign = document.createElementNS(svgNS,'foreignObject');

        foreign.setAttribute('x', 0);
        foreign.setAttribute('y', 0);
        foreign.setAttribute('id', id);


        var textNode = document.createTextNode(content);
        foreign.appendChild(textNode);
        return foreign;

    },

    assignToNode(parentNode, elm1, elm2, elmN){
		var elements = Array.prototype.slice.call(arguments, 1),
            parentId = Selector.getId(parentNode),
            offset = [0, 0];

        for (let elm of elements){
            let classes = elm.getAttribute('class'),
                elmBox = elm.getBBox(), 
                textWidth = elmBox['width'],
                textHeight = elmBox['height'];


            elm.setAttribute('class',  classes + ' ' + parentId + '-text' + ' ' + 'depends-' + parentId);
            elm.setAttribute('y', 200);

            console.log('offse', offset);
            Text.locateToNode(parentNode, elm, offset);

            offset = [textWidth, textHeight];
        }

    },

    locateToNode(parentNode, text, diff){
    	var leftOffset = 10
        bottomOffset = 10,
        diff = diff?diff:[0, 0],
        parentX = attr(parentNode, 'x'),
        parentY = attr(parentNode, 'y'),
        parentH = attr(parentNode, 'height'),
        parentW = attr(parentNode, 'width'),
        textBox = text.getBBox(),
        textH = parseInt(textBox.height),
        textW = parseInt(textBox.width);

        text.setAttribute('x', parentX + leftOffset + diff[0]);
        text.setAttribute('y', parentY +  (parentH / 2) + (textH / 4), diff[1]);

        return text;
    },

    setParent(parentNode, childrenNode){
        var parentId = Selector.getId(parentNode);
        var childrenClass = 'depends-node-' + parentId;

    }
};


module.exports = Text;