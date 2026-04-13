const innerScore = document.getElementById('inner_score');
const dial = document.getElementById('dial');
const scoreSlider = document.getElementById('score-slider');
const speedSlider = document.getElementById('speed-slider');
const scoreVal = document.getElementById('score-val');
const speedVal = document.getElementById('speed-val');
const scoreNum = document.getElementById('score-num');
const btnRand = document.getElementById('btn-rand');
const btnStop = document.getElementById('btn-stop');
const handle = document.getElementById('handle');
const handleSlider = document.getElementById('handle-slider');
const innerCover = document.getElementById('inner_cover');


let currentAngle = 0;
let targetDialAngle = 0;
let handleAngle = 0;
let targetHandleAngle = 0;
let spinDeg = 0;
let speed = 1;
let spinning = true;
let lastTime = null;

function scoreToAngle(s) {
    return -90 + (s / 100) * 180;
}

function setDialScore(s) {
    targetDialAngle = scoreToAngle(s);
    scoreVal.textContent = s;
    scoreNum.textContent = s;
    scoreSlider.value = s;
}

function setHandleScore(s) {
    targetHandleAngle = scoreToAngle(s);
    handleSlider.value = s;
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animate(ts) {
    if (!lastTime) lastTime = ts;
    const dt = Math.min((ts - lastTime) / 1000, 0.1);
    lastTime = ts;

    if (spinning) { spinDeg = (spinDeg + speed * 30 * dt) % 360; }
    innerScore.setAttribute('transform', `rotate(${spinDeg}, 328.18, 283.14)`);

    currentAngle = lerp(currentAngle, targetDialAngle, Math.min(dt * 5, 1));
    handleAngle = lerp(handleAngle, targetHandleAngle, Math.min(dt * 5, 1));

    dial.setAttribute('transform', `rotate(${currentAngle}, 328.18, 283.14)`);
    handle.setAttribute('transform', `rotate(${handleAngle}, 328.18, 283.14)`);
    innerCover.setAttribute('transform', `rotate(${handleAngle}, 328.18, 283.14)`);

    requestAnimationFrame(animate);
}

scoreSlider.addEventListener('input', () => setDialScore(Number(scoreSlider.value)));

speedSlider.addEventListener('input', () => {
    speed = Number(speedSlider.value);
    speedVal.textContent = speed + 'x';
});

handleSlider.addEventListener('input', () => setHandleScore(Number(handleSlider.value)));

btnRand.addEventListener('click', () => {
    const s = Math.round(Math.random() * 100);
    setDialScore(s);
});

btnStop.addEventListener('click', () => {
    spinning = !spinning;
    btnStop.textContent = spinning ? 'Pause spin' : 'Resume spin';
});

setDialScore(50);
setHandleScore(50);
requestAnimationFrame(animate);