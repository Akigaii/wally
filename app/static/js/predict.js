async function predict() {

    // Feed anchor pair and input word into Wally.
    const res = await fetch('/predict_route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            left: chosenPair[0],
            right: chosenPair[1],
            guess: guess.value,
        })
    });

    // Wally's prediction.
    const data = await res.json();

    // Set dial based on predicted score.
    dial.getBoundingClientRect();
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(${scoreToAngle(data.score)}deg)`;
    await sleep(1000);

    // Determines if dial is within a score-range, displays points accordingly.
    if       (data.score >= blueRange[0]   && data.score <= blueRange[1]  )  { score.textContent = "+3"; }
    else if  (data.score >= orangeRange[0] && data.score <= orangeRange[1])  { score.textContent = "+2"; }
    else if  (data.score >= yellowRange[0] && data.score <= yellowRange[1])  { score.textContent = "+1"; }
    else     { score.textContent = "+0"; }


    // Show points based off guess to user.
    hideWheel(false);
    await sleep(2000);
    score.getBoundingClientRect();
    score.style.transition = 'opacity 0.3s ease-in-out';
    score.style.opacity = '1';

    // Update debug console.
    document.getElementById("pred-score").textContent = `Predicted Score: ${data.score}`;

    // Reshows the draw button.
    fadeOut(input, 1);
    input.disabled = true;
    fadeOut(predictButton, 1);
    predictButton.disabled = true;
    fadeIn(drawButton, 1);
    drawButton.disabled = false;

}

// Keep track of user input text.
var chosenPair;
let guess = document.querySelector('input');
guess.addEventListener('input', function () {
    console.log(guess.value);
});
