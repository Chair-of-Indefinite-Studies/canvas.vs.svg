describe('billiard.Table', function(){
	var table;

	beforeEach(function(){
		table = new billiard.Table({
			width: 10,
			height: 5
		});
	});

	it('should have state', function(){
		var state = table.state();

		expect(state).toEqual({ width: 10, height: 5, balls: [] });
	});

	it('should add balls', function(){
		table.addBall({ vx: 1 });

		expect(table.state()).toEqual({
			width: 10, height: 5,
			balls: [{ x: 0, y: 0, vx: 1, vy: 0, r: 1 }]
		});
	});

	it('should tick', function(){
		table.addBall({ vx: 1 });

		table.tick();

		expect(table.state()).toEqual({
			width: 10, height: 5,
			balls: [{ x: 1, y: 0, vx: 1, vy: 0, r: 1 }]
		});
	});

	describe('tick', function(){
		it('should tick balls', function(){
			table.addBall({ vx: 1 });
			table.addBall({ y: 1, vx: -1 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x: 1, y: 0, vx: 1, vy: 0, r: 1 },
					{ x: -1, y: 1, vx: -1, vy: 0, r: 1 },
				]
			});
		});
	});

	describe('collision', function(){
		it('should not collide free ball', function(){
			table.addBall({ x: 0, y: 0, vx: 1, vy: 1 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x: 1, y: 1, vx: 1, vy: 1, r: 1 }
				]
			});
		});

		it('should resolve right wall collisions', function(){
			table.addBall({ x: 9, vx: 1 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x: 10, y: 0, vx: -1, vy: 0, r: 1 }
				]
			});
		});

		it('should resolve left wall collisions', function(){
			table.addBall({ x: -9, vx: -1 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x: -10, y: 0, vx: 1, vy: 0, r: 1 }
				]
			});
		});

		it('should resolve top wall collisions', function(){
			table.addBall({ y: 4, vx: 0, vy: 1 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x: 0, y: 5, vx: 0, vy: -1, r: 1 }
				]
			});
		});

		it('should resolve bottom wall collisions', function(){
			table.addBall({ y: -4, vx: 0, vy: -1 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x:0, y: -5, vx: 0, vy: 1, r: 1 }
				]
			});
		});

		it('should resolve collisions among balls', function(){
			table.addBall({ x: 0, y: 0, vx: 1, vy: 0 });
			table.addBall({ x: 4, y: 0, vx: -1, vy: 0 });

			table.tick();

			expect(table.state()).toEqual({
				width: 10, height: 5,
				balls: [
					{ x:1, y: 0, vx: -1, vy: 0, r: 1 },
					{ x:3, y: 0, vx: 1, vy: 0, r: 1 }
				]
			});

		});
	});
});
