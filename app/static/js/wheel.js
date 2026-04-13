const innerScore = document.getElementById('inner_score');
const dial = document.getElementById('dial');
const scoreSlider = document.getElementById('score-slider');
const speedSlider = document.getElementById('speed-slider');
const scoreVal = document.getElementById('score-val');
const speedVal = document.getElementById('speed-val');
const scoreNum = document.getElementById('score-num');
const btnRand = document.getElementById('btn-rand');
const btnStop = document.getElementById('btn-stop');

let currentAngle = 0;
let targetAngle = 0;
let spinDeg = 0;
let speed = 1;
let spinning = true;
let lastTime = null;

function scoreToAngle(s) {
    return -90 + (s / 100) * 180;
}

function setScore(s) {
    targetAngle = scoreToAngle(s);
    scoreVal.textContent = s;
    scoreNum.textContent = s;
    scoreSlider.value = s;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate(ts) {
    if (!lastTime) lastTime = ts;
    const dt = Math.min((ts - lastTime) / 1000, 0.1);
    lastTime = ts;

    if (spinning) {
    spinDeg = (spinDeg + speed * 30 * dt) % 360;
    }
    innerScore.style.transform = `rotate(${spinDeg}deg)`;

    currentAngle = lerp(currentAngle, targetAngle, Math.min(dt * 5, 1));
    dial.style.transform = `rotate(${currentAngle}deg)`;

    requestAnimationFrame(animate);
}

scoreSlider.addEventListener('input', () => setScore(Number(scoreSlider.value)));

speedSlider.addEventListener('input', () => {
    speed = Number(speedSlider.value);
    speedVal.textContent = speed + '×';
});

btnRand.addEventListener('click', () => {
    const s = Math.round(Math.random() * 100);
    setScore(s);
});

btnStop.addEventListener('click', () => {
    spinning = !spinning;
    btnStop.textContent = spinning ? 'Pause spin' : 'Resume spin';
});

setScore(50);
requestAnimationFrame(animate);