function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fadeIn(div) {
    div.getBoundingClientRect();
    div.style.transition = 'none';
    div.style.opacity = '0';
}

async function fadeOut(div) {
    div.getBoundingClientRect();
    div.style.transition = 'opacity 0.3s ease';
    div.style.opacity = '1';
}

async function hideWheel(hidden) {
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
    const ORIGIN = "328.18px 283.14px";
    const START_ANGLE = -42.25;

    innerScore.getBoundingClientRect();

    innerScore.style.transformOrigin = ORIGIN;
    innerScore.style.transition = "none";
    innerScore.style.transform = `rotate(${START_ANGLE}deg)`;

    innerScore.getBoundingClientRect();

    let delay = randomInt(2, 4);
    let validRange = randomInt(-80, 80);
    let numOfSpins = 360 * randomInt(1, 4);

    innerScore.style.transition = `transform ${delay}s ease-in-out`;
    innerScore.style.transform = `rotate(${START_ANGLE + validRange + numOfSpins}deg)`;

    await new Promise(resolve => setTimeout(resolve, delay * 1000));
}

const wordPairs = [
    ["Bad", "Good"],
    ["Cold", "Hot"],
    ["Dark", "Light"],
    ["Tiny", "Huge"],
    ["Soft", "Hard"],
    ["Square", "Round"],
    ["Snack", "Meal"],
    ["Boring", "Exciting"],
    ["Bad habit", "Good habit"],
    ["Childish", "Mature"],
    ["Colorless", "Colorful"],
    ["Dangerous Job", "Safe Job"],
    ["Easy to spell", "Hard to spell"],
    ["Easy to use", "Difficult to use"],
    ["Easy subject", "Hard subject"],
    ["Happens slowly", "Happens suddenly"],
    ["Hygenic", "Unhygenic"],
    ["Low calorie", "High calorie"],
    ["Mental activity", "Physical activity"],
    ["Messy food", "Clean food"],
    ["Niche fandom", "Mainstream fandom"],
    ["Nobody does it", "Everybody does it"],
    ["Quiet place", "Loud place"],
    ["Relaxing activity", "Stressful activity"],
    ["Smells bad", "Smells good"],
    ["Small talk", "Heavy topic"],
    ["Temporary", "Permanent"],
    ["Underpaid", "Overpaid"],
    ["Unpopular activity", "Popular activity"],
    ["Useless major", "Useful major"],
];

document.querySelector('.drawbutton').addEventListener('click', async function () {
    
    const wordPair = document.querySelector('.wordPair');
    chosenPair = wordPairs[randomInt(0, wordPairs.length)];
    wordPair.textContent = chosenPair[0] + " / " + chosenPair[1];

    fadeIn(wordPair);
    fadeOut(wordPair);
    
    await hideWheel(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await randomizeWheel();
    hideWheel(false);

});