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
			throw Error('Cant get id of', element);
		}

	},

	attr(element, attrName, value){
		return parseInt(element.getAttribute(attrName));
	},

	setAttr(element, attrName, value){
		element.setAttribute(attrName, value);
		return element;
	}


};

module.exports = Selector;