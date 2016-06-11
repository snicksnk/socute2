function FPS(displayCallback){


	var frameN = 0;
	setInterval( () => {
		displayCallback((frameN / 2));
		frameN = 0;
	}, 1000);

	return (lastTime) => {
		var startTime = new Date().getTime();
		


		return new Promise(resolve => {
			var minFrameTime = 30;

			var currentTime = new Date().getTime();
			var timeFromLastFrame = currentTime - lastTime;

			
			var delayTime = minFrameTime - timeFromLastFrame;

			if (delayTime < 0){
				delayTime = 0;
			}

			frameN++; 


			setTimeout(() => {resolve(currentTime);}, delayTime);
		})
	};
};

module.exports = FPS;