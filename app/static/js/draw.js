function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const wordPairs = [
    ["Cold", "Hot"],
    ["Dark", "Light"],
    ["Quiet place", "Loud place"],
    ["Colorless", "Colorful"],
    ["Soft", "Hard"],
    ["Low calorie", "High calorie"],
    ["Hygenic", "Unhygenic"],
    ["Happens slowly", "Happens suddenly"],
    ["Temporary", "Permanent"],
    ["Mental activity", "Physical activity"],
    ["Square", "Round"],
    ["Snack", "Meal"],
    ["Tiny", "Huge"],
    ["Messy food", "Clean food"],
    ["Dangerous Job", "Safe Job"],
    ["Childish", "Mature"],
    ["Bad habit", "Good habit"],
    ["Underpaid", "Overpaid"],
    ["Boring", "Exciting"],
    ["Useless major", "Useful major"],
    ["Small talk", "Heavy topic"],
    ["Niche fandom", "Mainstream fandom"],
    ["Unpopular activity", "Popular activity"],
    ["Nobody does it", "Everybody does it"],
    ["Bad", "Good"],
    ["Easy to use", "Difficult to use"],
    ["Relaxing activity", "Stressful activity"],
    ["Smells bad", "Smells good"],
    ["Easy to spell", "Hard to spell"],
    ["Easy subject", "Hard subject"],
];

document.querySelector('.drawbutton').addEventListener('click', function () {
    const wordPair = document.querySelector('.wordPair');
    wordPair.style.transition = 'none';
    wordPair.style.opacity = '0';
    chosenPair = wordPairs[randomInt(0, wordPairs.length)];
    wordPair.textContent = chosenPair[0] + " / " + chosenPair[1];
    wordPair.getBoundingClientRect();
    wordPair.style.transition = 'opacity 0.3s ease';
    wordPair.style.opacity = '1';
});