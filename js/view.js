(function(billiard, undefined){
	var CanvasBallView = function(ball, context){
		this.ball = ball;
		this.context = context;
		this.ball.on('tick', this.update.bind(this));
		this.update();
	};
	CanvasBallView.prototype.update = function(){
		this.context.beginPath();
		this.context.arc(this.ball.x, this.ball.y, this.ball.r, 0, 2 * Math.PI);
		this.context.stroke();
	};

	var CanvasTableView = billiard.CanvasView = function(table, canvas){
		this.table = table;
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.initialize();
		this.table.on('tick', this.update.bind(this));
		this.update();
	};
	CanvasTableView.prototype.initialize = function(){
		this.context.translate(this.canvas.width/2, this.canvas.height/2);
		this.table.balls.forEach(function(ball){
			new CanvasBallView(ball, this.context);
		}.bind(this));
	};
	CanvasTableView.prototype.update = function(){
		this.context.clearRect(
				-this.canvas.width/2,
				-this.canvas.height/2,
			this.canvas.width,
			this.canvas.height
		)
		this.context.strokeRect(
				-this.table.width,
				-this.table.height,
			2 * this.table.width,
			2 * this.table.height
		);
	};
})(billiard);
