var table = (function(fps, billiard, undefined){
	function range(l, h) {
		var result = [];
		while (h > l) { result[--h] = h; }
		return result;
	}

	var options = { width: 320, height: 240, collisions: true };
	var table = new billiard.Table(options);
	table.addBall({ x: -280, y: 0, vx: 2, vy: 0, r: 30 });
	table.addBall({ x: 0, y: 0, vx: 0, vy: 0, r: 10 });
	table.addBall({ x: 100, y: 0, vx: 0, vy: 0, r: 5 });

	return table;
})(fps, billiard);
