document.querySelector('.enter-button').addEventListener('click', async function () {
    document.querySelector('.parent').classList.toggle('moved');
    await sleep(1000);
    const game = document.querySelector('.game');
    game.style.display = 'block';
    setTimeout(() => game.style.opacity = '1', 100);
    setTimeout(() => totalPoints.style.opacity = '0.75', 100);
});
