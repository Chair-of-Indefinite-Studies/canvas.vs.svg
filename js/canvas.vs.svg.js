var table = (function(fps, billiard, undefined){
	var table = new billiard.Table({ width: 640, height: 480 });
	table.addBall({ x: 0, y: 1, vx: 3, vy: 2 });

	var counter = new fps.FrameCounter();

	function tick(){
		counter.registerFrame();
		table.tick();
		requestAnimationFrame(tick);
	}
	tick();

	var fpsSpan = document.getElementById('fps');
	setInterval(function(){
		fpsSpan.textContent = counter.fps().toFixed(1) + 'fps';
	}, 500);

	return table;
})(fps, billiard);
