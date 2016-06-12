var Selector = require('./selector');
var Img     = require('./image');
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


    _assignToNode(parentNode, elm1, elm2, elmN){
		var elements = Array.prototype.slice.call(arguments, 1),
            parentId = Selector.getId(parentNode),
            offset = [0, 0];

        for (let elm of elements){
            let classes = elm.getAttribute('class'),
                elmBox = elm.getBBox(), 
                textWidth = elmBox['width'],
                textHeight = elmBox['height'];


            elm.setAttribute('class',  classes + ' text-' + parentId  + ' ' + 'depends-' + parentId);
            elm.setAttribute('y', 200);

            Text.locateToNode(parentNode, elm, offset);
            offset = [textWidth + offset[0], textHeight + offset[1]];
        }

    },

    locateText(text){
        return function(parentNode, items){
            var textBox = text.getBBox(),
                textH = parseInt(textBox.height),
                textW = parseInt(textBox.width);
            var items = Img.locateIcon(text)(parentNode, items);
            Selector.setAttr(text, 'y', attr(text, 'y') + textH / 2)
            return items;
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
        //HACK 
        if (text.tagName === 'image'){
            text.setAttribute('y', parentY +  (parentH / 2) - (textH / 2));
        } else if (text.tagName === 'text'){
            text.setAttribute('y', parentY +  (parentH / 2) + (textH / 4));    
        }
       
        return text;
    },

    setParent(parentNode, childrenNode){
        var parentId = Selector.getId(parentNode);
        var childrenClass = 'depends-node-' + parentId;

    }
};


module.exports = Text;