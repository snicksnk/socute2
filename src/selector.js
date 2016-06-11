var $ = require('jquery');

var Selector = {
	getId(element){
		if (typeof(element) == 'string'){
			return element;
		}

		var id = $(element).attr('id');

		if (id){
			return id;
		} else {
			console.log(element);
			throw Error('Cant get id of', element);
		}

	},

	attr(element, attrName){
		return parseInt(element.getAttribute(attrName));
	},

	strAttr(element, attrName){
		return element.getAttribute(attrName) || '';
	},

	setAttr(element, attrName, value){
		element.setAttribute(attrName, value);
		return element;
	},

	appendAttr(element, attrName, value){
		var fullClassAttr = Selector.strAttr(element, attrName);
		fullClassAttr += ' ' + value;
		element = Selector.setAttr(element, attrName, fullClassAttr);
		return element;
	},

	getClasses(element){
		var classList = $(element).attr('class').split(/\s+/);
		return classList;
	},

	getNodeSubElements(node){
		var nodeId = Selector.getId(node);
		return $('.depends-' + nodeId);
	},

	getDumpOfElement(element){
		var type = $(element).prop("tagName"),
			attrs = {};

		for(let i = 0; i < element.attributes.length; i++){
			let attr = element.attributes[i];
			attrs[attr.name] = attr.value;
		}

		return {type, attrs, text: element.textContent};
	}

	
};

module.exports = Selector;