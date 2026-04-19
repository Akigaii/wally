let currentAngle = 0;
let targetDialAngle = 0;
let handleAngle = 0;
let targetHandleAngle = 0;
let spinDeg = 180;
let speed = 1;
let idleSpin = true;
let lastTime = null;

function setDialScore(s) {
    targetDialAngle = scoreToAngle(s);
    scoreVal.textContent = s.toFixed(1);
    scoreNum.textContent = s.toFixed(1);
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

    if (idleSpin) {
        spinDeg = (spinDeg + speed * 30 * dt) % 360;
        innerScore.style.transformOrigin = ORIGIN;
        innerScore.style.transition = 'none';
        innerScore.style.transform = `rotate(${spinDeg}deg)`;
    }

    currentAngle = lerp(currentAngle, targetDialAngle, Math.min(dt * 5, 1));
    handleAngle = lerp(handleAngle, targetHandleAngle, Math.min(dt * 5, 1));

    dial.setAttribute('transform', `rotate(${currentAngle}, 328.18, 283.14)`);
    handle.setAttribute('transform', `rotate(${handleAngle}, 328.18, 283.14)`);
    innerCover.setAttribute('transform', `rotate(${handleAngle}, 328.18, 283.14)`);

    requestAnimationFrame(animate);
}

scoreSlider.step = 0.01;

scoreSlider.addEventListener('input', () => setDialScore(Number(scoreSlider.value)));

speedSlider.addEventListener('input', () => {
    speed = Number(speedSlider.value);
    speedVal.textContent = speed + 'x';
});

handleSlider.addEventListener('input', () => setHandleScore(Number(handleSlider.value)));

btnRand.addEventListener('click', () => {
    const s = Math.round(Math.random() * 1000) / 10;
    setDialScore(s);        
});

btnStop.addEventListener('click', () => {
    idleSpin = !idleSpin;
    btnStop.textContent = idleSpin ? 'Pause spin' : 'Resume spin';
});

async function stopIdleSpin(duration) {
    const startSpeed = speed;
    for (let i = 20; i >= 0; i--) {
        speed = startSpeed * (i / 20);
        await sleep(duration / 20);
    }
    idleSpin = false;
    speed = startSpeed;
}

setDialScore(50);
setHandleScore(50);
requestAnimationFrame(animate);