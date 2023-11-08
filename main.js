function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function setObjectPosition(object, position) {
	console.log('inside relocate', object, position);
	object.style.top = position.y + 'px';
	object.style.left = position.x + 'px';
}
function createCircle(radious, color = 'black', position = { x: 0, y: 550 }) {
	const newCircle = document.createElement('div');
	newCircle.style.cssText = `  width: ${radious}px;
  height: ${radious}px;
  background-color: ${color};
  border-radius: 25px;
  position: absolute;
  top: ${position.y}px;
  left: ${position.x}px;`;
	document.getElementById('animationArea').appendChild(newCircle);
	return newCircle;
}

async function boxBounce(object, initialPosition = { x: 0, y: 550 }) {
	let x = initialPosition.x,
		y = initialPosition.y;
	let xDir = 5;
	let yDir = 7;
	while (1) {
		await timeout(1);
		if (x > 1000 - 50 || x < 0) {
			xDir = xDir * -1;
		}
		if (y > 600 - 50 || y < 0) {
			yDir = yDir * -1;
		}
		x += xDir;
		y += yDir;
		// break
		setObjectPosition(object, { x, y });
	}
}
async function projectile(
	object,
	angle,
	force,
	initialPosition = { x: 0, y: 550 }
) {
	let radians = (angle * Math.PI) / 180;

	let i = 0,
		xForce = force * Math.cos(radians),
		yForce = force * Math.cos(radians);
	let x = initialPosition.x,
		y = initialPosition.y;
	while (y >= 0 && x <= 950 && y <= 550 && x >= 0) {
		await timeout(100);
		createCircle(6, 'red', { x, y });
		setObjectPosition(object, { x, y });
		i += 0.5;
		y -= yForce * i - 0.5 * 10 * i * i;
		x += xForce * i;
		// if (i > 500) break;
	}
}

async function plot(eqn, start, end,resolution) {
	let x = start;
	while (x <= end) {
		const point = createCircle(3, "black");
		setObjectPosition(point, { x:x*50, y: eqn(x)*50 });
		x+=resolution
	}
}
plot(Math.sin,0,7.14,0.1)

// const circle1 = createCircle(50, 'black');
// const circle2 = createCircle(50, 'red');
// // const circle3 = createCircle(50, 'blue');
// // const circle4 = createCircle(50, 'green');
// // boxBounce(circle1);
// // boxBounce(circle2,{x:222,y:333});
// // boxBounce(circle3,{x:150,y:12});
// // boxBounce(circle4,{x:750,y:150});
// projectile(circle2, 15, 23);
