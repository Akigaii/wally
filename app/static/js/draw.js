function fadeIn(div) {
    div.getBoundingClientRect();
    div.style.transition = 'none';
    div.style.opacity = '0';
}

function fadeOut(div) {
    div.getBoundingClientRect();
    div.style.transition = 'opacity 0.3s ease';
    div.style.opacity = '1';
}

function hideWheel(hidden) {
    const handle = document.getElementById('handle');
    const innerCover = document.getElementById('inner_cover');
   
    innerCover.getBoundingClientRect();
    handle.getBoundingClientRect();

    innerCover.style.transformOrigin = "328.18px 283.14px";
    innerCover.style.transition = "transform 1s ease-in-out";
    innerCover.style.transform = (hidden == true) ? "rotate(180deg)" : "rotate(0deg)";

    handle.style.transformOrigin = "328.18px 283.14px";
    handle.style.transition = "transform 1s ease-in-out";
    handle.style.transform = (hidden == true) ? "rotate(180deg)" : "rotate(0deg)";
}

async function randomizeWheel() {
    const innerScore = document.getElementById('inner_score');

    innerScore.getBoundingClientRect();

    innerScore.style.transformOrigin = ORIGIN;
    innerScore.style.transition = "transform 0.1s ease-in-out";
    innerScore.style.transform = `rotate(${START_ANGLE}deg)`;

    innerScore.getBoundingClientRect();

    let delay = randomInt(2, 4);
    let validRange = randomInt(-80, 80);
    let numOfSpins = 360 * randomInt(1, 4);

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

    const score = document.querySelector('.score');
    score.textContent = "&nbsp";
    score.getBoundingClientRect();

    const dial = document.getElementById('dial');
    dial.style.transformOrigin = ORIGIN;
    dial.style.transition = "transform 1s ease-in-out";
    dial.style.transform = `rotate(0deg)`;
    dial.getBoundingClientRect();

    const drawButton = document.querySelector('.draw-button');
    drawButton.style.transition = "opacity 1s ease-in-out";
    drawButton.style.opacity = "0%";
    drawButton.disabled = true;
    drawButton.getBoundingClientRect();

    const input = document.querySelector('.input-text');
    input.style.transition = "opacity 1s ease-in-out";
    input.style.opacity = "100%";
    input.getBoundingClientRect();

    const predict  = document.querySelector('.predict-button');
    predict.style.transition = "opacity 1s ease-in-out";
    predict.style.opacity = "100%";
    predict.getBoundingClientRect();

    const wordPair = document.querySelector('.wordPair');
    chosenPair = WORD_PAIRS[randomInt(0, WORD_PAIRS.length - 1)];
    wordPair.textContent = chosenPair[0] + " / " + chosenPair[1];

    fadeIn(wordPair);
    fadeOut(wordPair);
    
    hideWheel(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await randomizeWheel();
    hideWheel(false);

});

