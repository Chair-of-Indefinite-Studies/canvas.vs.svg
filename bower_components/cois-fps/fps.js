;(function(ns, undefined){
	var fps = ns.fps = {};

	function now(){ return new Date(); };

	fps.averageStrategy = function(strength){
		var frameTime = 0;
		return function(currentTime, lastTime) {
			var currentFrameTime = currentTime - lastTime;
			frameTime += (currentFrameTime - frameTime) / strength;
			return 1000 / frameTime;
		}
	};

	var defaultOptions = {
		'clock': now,
		'strategy': fps.averageStrategy(20)
	}

	function throwOnUnknownOption(options){
		var offendingKeys = [];
		for (var key in options){
			if (!defaultOptions[key]) {
				offendingKeys.push(key);
			}
		}
		if (offendingKeys.length > 0) {
			throw new Error('unknown options: ' + offendingKeys
							.map(function(key){ return '\'' + key + '\''; })
							.join(', '));
		}
	}

	var FrameCounter = fps.FrameCounter = function(options){
		throwOnUnknownOption(options = options || {});
		this.clock = options.clock || defaultOptions.clock;
		this.strategy = options.strategy || defaultOptions.strategy;
		this.lastTime = this.clock();
		this._fps = 0;
	};
	FrameCounter.prototype.registerFrame = function(){
		var currentTime = this.clock();
		this._fps = this.strategy(currentTime, this.lastTime);
		this.lastTime = currentTime;

	};
	FrameCounter.prototype.fps = function(){
		return this._fps;
	};
})(window);
