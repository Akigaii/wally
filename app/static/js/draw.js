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

    // Spin the wheel randomly.
    let delay      = randomInt(2, 4);
    let trueScore  = randomInt(-80, 80); // Showable range.
    let numOfSpins = 360 * randomInt(1, 4);
    
    innerScore.style.transition = `transform ${delay}s ease-in-out`;
    innerScore.style.transform = `rotate(${START_ANGLE + trueScore + numOfSpins}deg)`;
    await sleep(delay * 1000);

    // Calculate true scores based on range positions.
    trueScore = +angleToScore(trueScore).toFixed(2);
    blueRange[0]   = trueScore - 3.1;
    blueRange[1]   = trueScore + 3.1;
    orangeRange[0] = trueScore - 9.4;
    orangeRange[1] = trueScore + 9.4;
    yellowRange[0] = trueScore - 15.5;
    yellowRange[1] = trueScore + 15.5;

    // Update the debug panel.
    document.getElementById("true-score").textContent   = `True Score: ${trueScore}`;
    document.getElementById("blue-range").textContent   = `Blue Range: ${blueRange[0]}-${blueRange[1]}`;
    document.getElementById("orange-range").textContent = `Orange Range: ${orangeRange[0]}-${orangeRange[1]}`;
    document.getElementById("yellow-range").textContent = `Yellow Range: ${yellowRange[0]}-${yellowRange[1]}`;
}


// Whenever you press the draw button.
document.querySelector('.draw-button').addEventListener('click', async function () {
    
    // Make draw button disappear.
    drawButton.classList.add('pressed');
    drawButton.style.pointerEvents = 'none';
    document.querySelector('.submit-arrow').style.color = "rgba(255, 255, 255, 0.6)";

    // Stop idle spin during the draw sequence.
    await stopIdleSpin(1000);
    hideWheel(true);

    // Clear the score header.
    score.getBoundingClientRect();
    score.innerHTML = "&nbsp";
    score.style.color = "#c0c0c0";
    score.style.opacity = '0';

    // Reset the dial to middle.
    dial.getBoundingClientRect();
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(0deg)`;

    // Make draw button disappear.
    fadeOut(drawButton, 1);
    drawButton.disabled = true;

    // Generate a random word pair.
    chosenPair = WORD_PAIRS[randomInt(0, WORD_PAIRS.length - 1)];
    wordPair.textContent = chosenPair[0] + " / " + chosenPair[1];
    fadeIn(wordPair, 0.3);
    await sleep(2000);

    // Reset inner score position to middle.
    innerScore.style.transformOrigin = ORIGIN;
    innerScore.style.transition = "transform 1s ease-in-out";
    innerScore.style.transform = `rotate(${START_ANGLE}deg)`;

    // Spin the wheel randomly.
    await sleep(1000);
    await randomizeWheel();

    // Show correct score, then hide again.
    hideWheel(false);
    progressBar.style.width = '100%';
    progressContainer.style.opacity = '1';
    await sleep(5000);
    progressContainer.style.opacity = '0';
    hideWheel(true);

    // Make input text and predict button appear.
    fadeIn(inputWrapper, 1);
    input.value = '';
    input.disabled = false;
    submitArrow.disabled = false;

});


