console.log('sasa')
co(function* () {
	var res = yield {
		1: Promise.resolve(1),
		2: Promise.resolve(2),
	};
	console.log(res); // => { 1: 1, 2: 2 }
}).catch(onerror);