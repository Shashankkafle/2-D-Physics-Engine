function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function setObjectPosition(object, position) {
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

async function boxBounce(object, initialPosition = { x: 0, y: 550 }, delay = 1) {
    let x = initialPosition.x,
        y = initialPosition.y;
    let xDir = 5;
    let yDir = 7;
    while (1) {
        await timeout(delay);
        if (x > 1000 - 50 || x < 0) {
            xDir = xDir * -1;
        }
        if (y > 600 - 50 || y < 0) {
            yDir = yDir * -1;
        }
        x += xDir;
        y += yDir;
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
        yForce = force * Math.sin(radians); 
    let x = initialPosition.x,
        y = initialPosition.y;
    while (1) {
        await timeout(100);
        createCircle(6, 'red', { x, y });
        setObjectPosition(object, { x, y });
        i += 0.1;
        y -= yForce * i - 0.5 * 10 * i * i;
        x += xForce * i;
		if(y < 0 || x > 950 || y > 550 || x < 0){
			object.remove();
			break;
		}
    }
}

async function plot(eqn, start, end, resolution) {
    let x = start;
    while (x <= end) {
        const point = createCircle(3, "black");
        setObjectPosition(point, { x: x * 50, y: eqn(x) * 50 });
        x += resolution
    }
}


function runBounce() {
  const delay = Number(document.getElementById('bounceDelay').value);
  const circle = createCircle(50, 'black');
  boxBounce(circle, { x: 0, y: 550 }, delay); 
}

function runProjectile() {
  const angle = Number(document.getElementById('projAngle').value);
  const force = Number(document.getElementById('projForce').value);
  const circle = createCircle(50, 'red');
  projectile(circle, angle, force);
}

function runPlot() {
  const funcName = document.getElementById('plotFunc').value;
  const start = Number(document.getElementById('plotStart').value);
  const end = Number(document.getElementById('plotEnd').value);
  const res = Number(document.getElementById('plotRes').value);
  plot(Math[funcName], start, end, res);
}

function clearScreen() {
  document.getElementById('animationArea').innerHTML = '';
}