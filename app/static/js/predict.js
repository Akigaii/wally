function predict() {
    fetch('/predict_route', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        left: chosenPair[0],
        right: chosenPair[1],
        guess: guess.value,
    })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.querySelector('.score').textContent = data.score;
        document.querySelector('.score').getBoundingClientRect();
        document.querySelector('.score').style.transition = 'opacity 0.3s ease';
        document.querySelector('.score').style.opacity = '1';
    });
}

var chosenPair;
let guess = document.querySelector('input');
guess.addEventListener('input', function () {
    console.log(guess.value);
});
