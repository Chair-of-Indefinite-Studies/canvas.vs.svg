fps
===

Measures frames per second

Installation
------------

You can acquire `fps` via bower

```sh
bower install cois-fps
```

and then include it in your html page

```html
<script type="text/javascript" src="bower_components/cois-fps/fps.js"></script>
```

Usage
-----

You first need to create a `fps.FrameCounter`

```js
var counter = new fps.FrameCounter();
```

This `counter` can be used to count frames e.g. in a game loop.

```js
function tick() {
	counter.registerFrame();
	requestAnimationFrame(tick);
}
```

You can then retrieve the frames per second `fps` method.

```js
var fpsSpan = document.getElementById('fps');
setInterval(function(){
	fpsSpan.textContent = counter.fps() + ' fps';
}, 1000); // update every second
```

### Options

Options are provided with an options hash. The options that are
supported are described below. If unknown options are provided an
exception is thrown.

#### clock

*default* `function(){ return new Date(); }`

Responsible for keeping track of time. Used when `registerFrame` is
called. When called should return the milliseconds elapsed since an
epoch, e.g. 1 January 1970.

#### strategy

*default* `fps.averageStrategy(20)`

Responsible for the actual calculation of the frames per second. When
called should return the frames per second that will be reported by a
call to the `fps` method.

It is provided with two arguments

1. `currentTime`. The current time as reported by the `clock`.
2. `lastTime`. The previous time `registerFrame` was called.

Development
-----------

We use [gulp][] to manage our minification of our javascript
files. You acquire it with the following command:

```sh
npm install
```

You run it with

```sh
gulp
```

[gulp]: http://gulpjs.com/
