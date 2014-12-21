(function(fps, billiard, table, undefined){
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
})(fps, billiard, table);
