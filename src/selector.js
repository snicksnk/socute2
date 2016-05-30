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
	}


};

module.exports = Selector;