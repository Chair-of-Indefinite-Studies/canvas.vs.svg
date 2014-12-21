var table = (function(fps, billiard, undefined){
	var table = new billiard.Table({ width: 640, height: 480 });
	table.addBall({ x: 0, y: 1, vx: 3, vy: 2 });
	return table;
})(fps, billiard);
