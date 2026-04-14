function scoreToAngle(score) {
    return -90 + (score / 100) * 180;
}

function trueScore(angle) {

}



async function predict() {
    const res = await fetch('/predict_route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            left: chosenPair[0],
            right: chosenPair[1],
            guess: guess.value,
        })
    });

    const data = await res.json();
    console.log(data);

    const ORIGIN = "328.18px 283.14px";

    const scoreEl = document.querySelector('.score');
    scoreEl.textContent = data.score;
    scoreEl.getBoundingClientRect()
    scoreEl.style.transition = 'opacity 0.3s ease';
    scoreEl.style.opacity = '1';

    const dial = document.getElementById('dial');
    dial.getBoundingClientRect();
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(${scoreToAngle(data.score)}deg)`;

}

var chosenPair;
let guess = document.querySelector('input');
guess.addEventListener('input', function () {
    console.log(guess.value);
});
