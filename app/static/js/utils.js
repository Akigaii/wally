function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scoreToAngle(score) {
    return -90 + (score / 100) * 180;
}

function angleToScore(angle) {
    return (angle + 90) / 180 * 100;
}

const ORIGIN = "328.18px 283.14px";
const ORIGIN_SVG = "328.18, 283.14"; 
const START_ANGLE = -42.25; 
const WORD_PAIRS = [
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

document.addEventListener("keydown", (event) => {
    if (event.key === "`") {
        const debugs = document.querySelector('.debugs');
        debugs.style.display = debugs.style.display === 'none' ? 'block' : 'none';
    }
});

let trueScore = 50;
let blueRange = [50 - 3.2, 50 + 3.2];
let orangeRange = [50 - 9.6, 50 + 9.6];
let yellowRange = [50 - 15.6, 50 + 15.6];

const innerScore = document.getElementById('inner_score');
const dial = document.getElementById('dial');
const score = document.querySelector('.score');
const scoreSlider = document.getElementById('score-slider');
const speedSlider = document.getElementById('speed-slider');
const scoreVal = document.getElementById('score-val');
const speedVal = document.getElementById('speed-val');
const scoreNum = document.getElementById('score-num');
const btnRand = document.getElementById('btn-rand');
const btnStop = document.getElementById('btn-stop');
const handle = document.getElementById('handle');
const handleSlider = document.getElementById('handle-slider');
const innerCover = document.getElementById('inner_cover');
const drawButton = document.querySelector('.draw-button');
const wordPair = document.querySelector('.wordPair');
const input = document.querySelector('.input-text');
const predictButton = document.querySelector('.predict-button');



