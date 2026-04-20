async function predict() {

    document.querySelector('.submit-arrow').style.color = "#a772f5";

    // Clear the score header.
    score.getBoundingClientRect();
    score.innerHTML = "&nbsp";
    score.style.opacity = '0';

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
    if (typeof data.score !== 'number') {
        score.getBoundingClientRect();
        score.textContent = data.score;
        score.style.transition = 'opacity 0.3s ease-in-out';
        score.style.opacity = '1';
        return;
    }

    // Set dial based on predicted score.
    dial.getBoundingClientRect();
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(${scoreToAngle(data.score)}deg)`;
    await sleep(1000);

    // Determines if dial is within a score-range, displays points accordingly.
    if (data.score >= blueRange[0] && data.score <= blueRange[1]  )  { 
        score.textContent = "+4"; 
        score.style.color = "#8ad9e3";
        points += 4;
    }
    else if (data.score >= orangeRange[0] && data.score <= orangeRange[1])  { 
        score.textContent = "+3"; 
        score.style.color = "#f5912e";
        points += 3;
    }
    else if  (data.score >= yellowRange[0] && data.score <= yellowRange[1])  { 
        score.textContent = "+2"; 
        score.style.color = "#e3e18a";
        points += 2;
    }
    else { 
        score.textContent = "+0"; 
        score.style.color = "#c0c0c0";
    }

    totalPoints.textContent = `Total Points: ${points}`;

    // Show points based off guess to user.
    hideWheel(false);
    await sleep(1000);
    score.getBoundingClientRect();
    score.style.transition = 'opacity 0.3s ease-in-out';
    score.style.opacity = '1';

    // Update debug console.
    document.getElementById("pred-score").textContent = `Predicted Score: ${data.score}`;

    // Reshows the draw button.
    fadeOut(inputWrapper, 1);
    inputWrapper.disabled = true;
    submitArrow.disabled = true;
    drawButton.classList.remove('pressed');
    fadeIn(drawButton, 1);
    drawButton.disabled = false;

}

// Keep track of user input text.
var chosenPair;
let guess = document.querySelector('input');
guess.addEventListener('input', function () {
    if (guess.value === "") 
        document.querySelector('.submit-arrow').style.color = "rgba(255, 255, 255, 0.6)";

    else{
        document.querySelector('.submit-arrow').style.color = "#f6b826";
    }
});
