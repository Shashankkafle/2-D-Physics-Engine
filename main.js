function timeout(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function setObjectPosition(object, position) {
	console.log('inside relocate', object, position);
	object.style.top = position.y + 'px';
	object.style.left = position.x + 'px';
}
function createCircle(radious, color = 'black', position = { x: 0, y: 0 }) {
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

async function animate(
	object
	// pathFunction,
	// increment = 1,
	// initialPosition = { x: 500, y: 500 }
) {
	console.log('animating');
	// linePath(object, initialPosition, iteration);
	let x = 0,
		y = 0;
	let xDir = 1;
	let yDir = 1;
	while (1) {
		await timeout(10);
		if (x > 1000 - 50 || x < 0) {
			xDir = xDir * -1;
		}
		if (y > 600 - 50 || y < 0) {
			yDir = yDir * -1;
		}
		x += xDir;
		y += yDir;

		setObjectPosition(object, { x, y });
		console.log({ x, y });
	}
	// setTimeout(() => {
	//   console.log({ x: x++, y: y++ });
	//   setObjectPosition(circle, { x: x++, y: y++ });
	// }, '100');
	// iteration += increment;
	// requestAnimationFrame(animate);
}

const circle = createCircle(50);
animate(circle);
