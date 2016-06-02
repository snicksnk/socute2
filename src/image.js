"use strict";

var Images = {
	create(id, path, size){
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var svgNS = svg.namespaceURI;
        var text = document.createElementNS(svgNS,'image');
        var size = size?size:[0, 0];
        
        text.setAttribute('x', 0);
        text.setAttribute('y', 0);
        text.setAttribute('id', id);
        text.setAttribute('xlink:href', path);
        text.setAttribute('width', size[0]);
        text.setAttribute('height', size[1]);
       
        var textNode = document.createTextNode(value);
        text.appendChild(textNode);
        return text;
	}
};

module.exports = Images;