;(function(ns, undefined){
	function dot(a, b){
		return a.x * b.x + a.y * b.y;
	};

	function scale(a, k){
		return { x: a.x * k, y: a.y * k };
	};

	function difference(a, b){
		return { x: a.x - b.x, y: a.y - b.y };
	}

	function sum(a, b){
		return { x: a.x + b.x, y: a.y + b.y };
	}

	function reflect(v, n){
		var norm = Math.sqrt(dot(n, n));
		var normal = scale(n, 1/norm);
		var pn = scale(normal, dot(normal, v));
		return sum(scale(pn, -2), v);
	};

	var Observable = function(){
		this.observers = {};
	};
	Observable.prototype.on = function(event, callback) {
		(this.observers[event] = this.observers[event] || []).push(callback);
	};
	Observable.prototype.signal = function(event){
		var args = Array.prototype.slice.call(arguments, 1);
		(this.observers[event] = this.observers[event] || []).forEach(function(callback){
			callback.apply(undefined, args);
		});
	};

	var billiard = ns.billiard = {};

	var defaultBallState = {
		'x': 0,
		'y': 0,
		'vx': 1,
		'vy': 0,
		'r': 1
	};

	var Ball = billiard.Ball = function(state){
		Observable.call(this);
		state = state || {};
		for (var key in defaultBallState) {
			this[key] = state[key] !== undefined ? state[key] : defaultBallState[key];
		}
	};
	Ball.prototype = Object.create(Observable.prototype);
	Ball.prototype.constructor = Ball;
	Ball.prototype.state = function(){
		var result = {};
		for (var key in defaultBallState) {
			result[key] = this[key];
		}
		return result;
	};
	Ball.prototype.tick = function(){
		this.x += this.vx;
		this.y += this.vy;
		this.signal('tick', this.state());
	};
	Ball.prototype.reflectX = function(){
		this.vx *= -1;
	}
	Ball.prototype.reflectY = function(){
		this.vy *= -1;
	}
	Ball.prototype.collideWith = function(other){
		/* factor in momentum */
		var v = reflect(
			{ x: this.vx, y: this.vy },
			{ x: this.x - other.x, y: this.y - other.y }
		);

		this.vx = v.x;
		this.vy = v.y;
	}

	function distance(p, q){
		return Math.sqrt(dot(p, q));
	};

	function minimalSeperation(p, q){
		return p.r + q.r;
	};

	var defaultTableState = {
		width: function(){ return 10; },
		height: function(){ return 5; },
		collisions: function(){ return true; },
		balls: function(){ return []; }
	}

	var Table = billiard.Table = function(state){
		Observable.call(this);
		state = state || {};
		for (var key in defaultTableState) {
			this[key] = state[key] !== undefined ? state[key] : defaultTableState[key]();
		}
		this.balls = this.balls.map(function(ballState){ return new Ball(state); });
	};
	Table.prototype = Object.create(Observable.prototype);
	Table.prototype.constructor = Table;
	Table.prototype.state = function(){
		var result = {};
		for (var key in defaultTableState){
			result[key] = this[key];
		}
		result.balls = result.balls.map(function(ball){ return ball.state(); });
		return result;
	};
	Table.prototype.addBall = function(state){
		var ball = new Ball(state);
		this.balls.push(ball);
		this.signal('ball', ball);
	};
	Table.prototype.tick = function(){
		this.signal('tick');
		this.balls.forEach(function(ball){ ball.tick(); });
		this.balls
			.filter(function(ball){
				return ball.x >= (this.width - ball.r) && ball.vx > 0 ||
					ball.x <= -(this.width - ball.r) && ball.vx < 0;
			}.bind(this))
			.forEach(function(ball){ ball.reflectX(); });
		this.balls
			.filter(function(ball){
				return ball.y >= (this.height - ball.r) && ball.vy > 0 ||
					ball.y <= -(this.height - ball.r) && ball.vy < 0;
			}.bind(this))
			.forEach(function(ball){ ball.reflectY(); });
		if (this.collisions) {
			this.balls.forEach(function(ball){
				this.balls
					.filter(function(target){ return target !== ball; })
					.filter(function(target){
						return distance(ball, target) <= minimalSeperation(ball, target);
					}).forEach(function(target){
						ball.collideWith(target);
					});
			}.bind(this));
		}
	};
})(window);
