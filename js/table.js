var table = (function(fps, billiard, undefined){
	function range(l, h) {
		var result = [];
		while (h > l) { result[--h] = h; }
		return result;
	}

	var options = { width: 320, height: 240, collisions: false };
	var table = new billiard.Table(options);

	(range(0, 1)).forEach(function(_, index){
		var x = Math.floor(2 * options.width * (Math.random() - 1/2));
		var y = Math.floor(2 * options.height * (Math.random() - 1/2));
		var vx = Math.floor(10 * (Math.random() - 1/2));
		var vy = Math.floor(6 * (Math.random() - 1/2));
		table.addBall({ x: x, y: y, vx: vx, vy: vy, r: 10 });
	});
	return table;
})(fps, billiard);
