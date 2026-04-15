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
    const handle = document.getElementById('handle');
    const innerCover = document.getElementById('inner_cover');
   
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
    const innerScore = document.getElementById('inner_score');

    innerScore.style.transformOrigin = ORIGIN;
    innerScore.style.transition = "transform 0.1s ease-in-out";
    innerScore.style.transform = `rotate(${START_ANGLE}deg)`;
    innerScore.getBoundingClientRect();

    let delay = randomInt(2, 4);
    let validRange = randomInt(-80, 80);
    let numOfSpins = 360 * randomInt(1  , 4);

    innerScore.style.transition = `transform ${delay}s ease-in-out`;
    innerScore.style.transform = `rotate(${START_ANGLE + validRange + numOfSpins}deg)`;

    trueScore = +angleToScore(validRange).toFixed(2);

    blueRange[0] = trueScore - 3;
    blueRange[1] = trueScore + 3;
    orangeRange[0] = trueScore - 9;
    orangeRange[1] = trueScore + 9;
    yellowRange[0] = trueScore - 15;
    yellowRange[1] = trueScore + 15;

    document.getElementById("true-score").textContent = `True Score: ${trueScore}`;
    document.getElementById("blue-range").textContent = `Blue Range: ${blueRange[0]}-${blueRange[1]}`;
    document.getElementById("orange-range").textContent = `Orange Range: ${orangeRange[0]}-${orangeRange[1]}`;
    document.getElementById("yellow-range").textContent = `Yellow Range: ${yellowRange[0]}-${yellowRange[1]}`;

    await new Promise(resolve => setTimeout(resolve, delay * 1000));
}


document.querySelector('.draw-button').addEventListener('click', async function () {

    // Clear the score header.
    const score = document.querySelector('.score');
    score.textContent = "&nbsp";
    score.getBoundingClientRect();

    // Reset the dial to middle.
    const dial = document.getElementById('dial');
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(0deg)`;
    dial.getBoundingClientRect();

    // Make draw button disappear.
    const drawButton = document.querySelector('.draw-button');
    fadeOut(drawButton, 1);
    drawButton.disabled = true;

    // Generate a random word pair.
    const wordPair = document.querySelector('.wordPair');
    chosenPair = WORD_PAIRS[randomInt(0, WORD_PAIRS.length - 1)];
    wordPair.textContent = chosenPair[0] + " / " + chosenPair[1];
    fadeIn(wordPair, 0.3);
    await sleep(1000);

    // Randomize the wheel.
    hideWheel(true);
    await sleep(1000);
    await randomizeWheel();
    hideWheel(false);

    // Make input text appear.
    const input = document.querySelector('.input-text');
    fadeIn(input, 1);

    // Make predict button appear.
    const predict  = document.querySelector('.predict-button');
    fadeIn(predict, 1);

});

