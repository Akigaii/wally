function fadeIn(div, time) {
    div.getBoundingClientRect();
    div.style.transition = `opacity ${time}s ease`;
    div.style.opacity = '1';
}

function fadeOut(div, time) {
    div.getBoundingClientRect();
    div.style.transition = `opacity ${time}s ease`;
    div.style.opacity = '0';
}

function hideWheel(hidden) {

    innerCover.getBoundingClientRect();
    handle.getBoundingClientRect();

    innerCover.style.transformOrigin = ORIGIN;
    innerCover.style.transition = "transform 1s ease-in-out";
    innerCover.style.transform = (hidden == true) ? "rotate(180deg)" : "rotate(0deg)";

    handle.style.transformOrigin = ORIGIN;
    handle.style.transition = "transform 1s ease-in-out";
    handle.style.transform = (hidden == true) ? "rotate(180deg)" : "rotate(0deg)";
}


async function randomizeWheel() {

    // Smoothly reset inner score back to default position.
    innerScore.getBoundingClientRect();
    innerScore.style.transformOrigin = ORIGIN;
    innerScore.style.transition = "transform 0.1s ease-in-out";
    innerScore.style.transform = `rotate(${START_ANGLE}deg)`;

    // Spin the wheel randomly.
    let delay      = randomInt(2, 4);
    let validRange = randomInt(-80, 80);
    let numOfSpins = 360 * randomInt(1, 4);
    await sleep(200);
    
    innerScore.style.transition = `transform ${delay}s ease-in-out`;
    innerScore.style.transform = `rotate(${START_ANGLE + validRange + numOfSpins}deg)`;
    console.log(START_ANGLE + validRange + numOfSpins);
    await sleep(delay * 1000);

    // Calculate true scores based on range positions.
    trueScore = +angleToScore(validRange).toFixed(2);
    blueRange[0]   = trueScore - 3;
    blueRange[1]   = trueScore + 3;
    orangeRange[0] = trueScore - 9;
    orangeRange[1] = trueScore + 9;
    yellowRange[0] = trueScore - 15;
    yellowRange[1] = trueScore + 15;

    // Update the debug panel.
    document.getElementById("true-score").textContent   = `True Score: ${trueScore}`;
    document.getElementById("blue-range").textContent   = `Blue Range: ${blueRange[0]}-${blueRange[1]}`;
    document.getElementById("orange-range").textContent = `Orange Range: ${orangeRange[0]}-${orangeRange[1]}`;
    document.getElementById("yellow-range").textContent = `Yellow Range: ${yellowRange[0]}-${yellowRange[1]}`;
}


// Whenever you press the draw button.
document.querySelector('.draw-button').addEventListener('click', async function () {

    // Clear the score header.
    score.innerHTML = "&nbsp;";
    score.getBoundingClientRect();

    // Reset the dial to middle.
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(0deg)`;
    dial.getBoundingClientRect();

    // Make draw button disappear.
    fadeOut(drawButton, 1);
    drawButton.disabled = true;

    // Generate a random word pair.
    chosenPair = WORD_PAIRS[randomInt(0, WORD_PAIRS.length - 1)];
    wordPair.textContent = chosenPair[0] + " / " + chosenPair[1];
    fadeIn(wordPair, 0.3);

    // Unveil, randomize, then hide the wheel.
    await sleep(1000);
    hideWheel(true);

    await sleep(1000);
    await randomizeWheel();
    hideWheel(false);
    await sleep(5000);
    hideWheel(true);

    // Make input text and predict button appear.
    fadeIn(input, 1);
    fadeIn(predictButton, 1);

});

