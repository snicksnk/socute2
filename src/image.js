"use strict";
var Selector = require('./selector'),
    setAttr  = Selector.setAttr,
    attr     = Selector.attr;
var Images = {
    create(id, path, size){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var text = document.createElementNS(svgNS,'image');
        var size = size?size:[0, 0];

        text.setAttribute('x', 0);
        text.setAttribute('y', 0);
        text.setAttribute('id', id);
        text.setAttributeNS('http://www.w3.org/1999/xlink','href', path);
        text.setAttribute('width', size[0]);
        text.setAttribute('height', size[1]);
       
        return text;
    },
    locateIcon(icon){
      return function(parentNode, items){
            var parentId = Selector.getId(parentNode),
                classes = icon.getAttribute('class'),
                offset = [0 ,0],
                iconsOffset = [5, 15];

            icon.setAttribute('y', iconsOffset[1]);
            icon.setAttribute('class',  classes + ' text-' + parentId  + ' ' + 'depends-' + parentId);
            
            if (items.length < 1){
                setAttr(icon, 'x', iconsOffset[0]);
            } else {
                let prevIcon = items.pop();
                let prevIconX   = attr(prevIcon, 'x'),
                    prevIconY  = attr(prevIcon,  'y'),
                    prevIconBox = prevIcon.getBBox(), 
                    prevWidth = prevIconBox['width'],
                    prevHeight = prevIconBox['height'];

                setAttr(icon, 'x', prevIconX + prevWidth + iconsOffset[0]);
                
                console.log(prevIcon, prevIconBox);
            }

            
            items.push(icon);

            return items;
      }
    }
};

module.exports = Images;