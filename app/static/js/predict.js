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

    const dial = document.getElementById('dial');
    dial.getBoundingClientRect();
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(${scoreToAngle(data.score)}deg)`;

    document.getElementById("pred-score").textContent = `Predicted Score: ${data.score}`;
    const score = document.querySelector('.score');
    score.getBoundingClientRect()
    score.style.transition = 'opacity 0.3s ease-in-out';
    score.style.opacity = '1';

}

var chosenPair;
let guess = document.querySelector('input');
guess.addEventListener('input', function () {
    console.log(guess.value);
});
