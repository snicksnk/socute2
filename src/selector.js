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
};

module.exports = Selector;