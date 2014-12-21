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

	var svgns = 'http://www.w3.org/2000/svg';

	var SVGBallView = function(ball, svg){
		this.ball = ball;
		this.svg = svg;
		this.ball.on('tick', this.update.bind(this));
		this.update();
	};
	SVGBallView.prototype.update = function(){
		var circle = this.circle();
		circle.setAttribute('cx', this.ball.x);
		circle.setAttribute('cy', this.ball.y);
		circle.setAttribute('r', this.ball.r);
		circle.setAttribute('stroke', 'black');
		circle.setAttribute('fill', 'none');
	};
	SVGBallView.prototype.circle = function(){
		if (!this._circle) {
			this._circle = document.createElementNS(svgns, 'circle');
			this.svg.appendChild(this._circle);
		}
		return this._circle;
	};

	var SVGTableView = billiard.SVGView = function(table, svg){
		this.table = table;
		this.svg = svg;
		this.initialize();
		this.update();
	};
	SVGTableView.prototype.initialize = function(){
		this.svg.setAttribute('viewBox', [
				-this.table.width,
				-this.table.height,
			2 * this.table.width,
			2 * this.table.height
		]);
		this.table.balls.forEach(function(ball){
			new SVGBallView(ball, this.svg);
		}.bind(this));
	};
	SVGTableView.prototype.update = function(){
		var rect = this.rectangle();
		rect.setAttribute('x', -this.table.width);
		rect.setAttribute('y', -this.table.height);
		rect.setAttribute('width', 2 * this.table.width);
		rect.setAttribute('height', 2 * this.table.height);
		rect.setAttribute('stroke', 'black');
		rect.setAttribute('fill', 'none');
	};
	SVGTableView.prototype.rectangle = function(){
		if (!this._rect) {
			this._rect = document.createElementNS(svgns, 'rect');
			this.svg.appendChild(this._rect);
		}
		return this._rect;
	}
})(billiard);
