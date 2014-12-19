describe('billiard.Ball', function(){
	it('should have a state', function(){
		var expectedState = {
			x: 0,
			y: 0,
			vx: 1,
			vy: 0
		}
		var ball = new billiard.Ball(expectedState);

		var state = ball.state();

		expect(state).toEqual(expectedState);
	});

	it('should tick', function(){
		var ball = new billiard.Ball({ x: 0, y: 0, vx: 1, vy: -1 });

		ball.tick();

		expect(ball.state()).toEqual({ x: 1, y: -1, vx: 1, vy: -1 });
	});

	it('should reflectX', function(){
		var ball = new billiard.Ball({ x: 0, y: 0, vx: 1, vy: -1 });

		ball.reflextX();

		expect(ball.state()).toEqual({ x: 0, y: 0, vx: -1, vy: -1 });
	});

	it('should reflectY', function(){
		var ball = new billiard.Ball({ x: 0, y: 0, vx: 1, vy: -1 });

		ball.reflextY();

		expect(ball.state()).toEqual({ x: 0, y: 0, vx: 1, vy: 1 });
	});

	it('should notify a tick', function(){
		var notified = false;
		var ball = new billiard.Ball();
		ball.on('tick', function(){ notified = true; });

		ball.tick();

		expect(notified).toBeTruthy();
	});

	describe('tick notification', function(){
		it('should pass ball state', function(){
			var actualState = {};
			var ball = new billiard.Ball();
			ball.on('tick', function(state){ actualState = state; });

			ball.tick();

			expect(actualState).toEqual({ x: 1, y: 0, vx: 1, vy: 0 });
		});
	});
});
