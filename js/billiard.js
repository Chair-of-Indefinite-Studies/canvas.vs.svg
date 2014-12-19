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

	var defaultState = {
		'x': 0,
		'y': 0,
		'vx': 1,
		'vy': 0,
		'r': 1
	};

	var Ball = billiard.Ball = function(state){
		Observable.call(this);
		state = state || {};
		for (var key in defaultState) {
			this[key] = state[key] || defaultState[key];
		}
	};
	Ball.prototype = Object.create(Observable.prototype);
	Ball.prototype.constructor = Ball;
	Ball.prototype.state = function(){
		var result = {};
		for (var key in defaultState) {
			result[key] = this[key];
		}
		return result;
	};
	Ball.prototype.tick = function(){
		this.x += this.vx;
		this.y += this.vy;
		this.signal('tick', this.state());
	};
	Ball.prototype.reflextX = function(){
		this.vx *= -1;
	}
	Ball.prototype.reflextY = function(){
		this.vy *= -1;
	}
	Ball.prototype.collideWith = function(other){
		var v = reflect(
			{ x: this.vx, y: this.vy },
			{ x: this.x - other.x, y: this.y - other.y }
		);

		this.vx = v.x;
		this.vy = v.y;
	}
})(window);
