;(function(fps, undefined){
	var counter = new fps.FrameCounter();

	function tick(){
		counter.registerFrame();
		requestAnimationFrame(tick);
	}
	tick();

	var fpsSpan = document.getElementById('fps');
	setInterval(function(){
		fpsSpan.textContent = counter.fps().toFixed(1) + 'fps';
	}, 500);
})(fps);
