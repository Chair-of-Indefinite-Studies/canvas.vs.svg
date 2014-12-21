var table = (function(fps, billiard, undefined){
	var table = new billiard.Table({ width: 320, height: 240 });
	table.addBall({ x: 0, y: 1, vx: 3, vy: 2, r: 10 });
	return table;
})(fps, billiard);
