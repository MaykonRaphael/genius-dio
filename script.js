let colorSequence = [];
let playerSequence = [];
let playerScore = 0;

const blue = document.querySelector('.btn-blue');
const yellow = document.querySelector('.btn-yellow');
const red = document.querySelector('.btn-red');
const green = document.querySelector('.btn-green');
const buttonStart = document.querySelector('.button:last-child');
const buttonStop = document.querySelector('.button:first-child');

const shuffleOrderColors = () => {
    let shuffleColor = Math.floor(Math.random() * 4);
    colorSequence[colorSequence.length] = shuffleColor;
    playerSequence = [];

    for( let i in colorSequence ) {
        let colorElement = createColorElement(colorSequence[i]);
        lightUpColorSequence(colorElement, Number(i) + 1);
    }
}

const lightUpColorSequence = (colorElement, number) => {
    number *= 500;
    setTimeout(()=> {
        colorElement.classList.add('selected');
    }, number - 250);
    
    setTimeout(()=> {
        colorElement.classList.remove('selected');
    }, number);
}

const checkShuffleColors = () => {
    for( let i in playerSequence ) {
        if( playerSequence[i] != colorSequence[i] ) {
            gameOver();
            break;
        }
    }

    if( playerSequence.length == colorSequence.length ) {
        // alert(`Pontuação: ${playerScore}`);
        playerScore++;
        nextSequence();
    }
}

const playerClickedColor = color => {
    playerSequence[playerSequence.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(()=> {
        createColorElement(color).classList.remove('selected');
        checkShuffleColors();
    }, 250);
}

const createColorElement = color => {
    switch(color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
    }
}

const nextSequence = () => {
    document.querySelector('.score span').innerText = playerScore;
    shuffleOrderColors();
}

const gameOver = () => {
    // alert(`Voce Perder\nPontuação: ${playerScore}\nClique em Ok pare iniciar outro jogo!`);
    document.querySelector('.welcome-modal').style.display = 'block';
    document.querySelector('.content span').innerText = `Você Errou!\nPontuação: ${playerScore}\nDeseja iniciar outro jogo?`;
    document.querySelector('.button:first-child').style.display = 'block';
    document.querySelector('.button:last-child').innerText = 'Sim';

    
    startGame();
}


const startGame = () => {
    // alert('Bem Vindo ao Genius! Vamos começar!');
    colorSequence = [];
    playerSequence = [];
    playerScore = 0;

    nextSequence();
}

green.onclick = () => playerClickedColor(0);
red.onclick = () => playerClickedColor(1);
yellow.onclick = () => playerClickedColor(2);
blue.onclick = () => playerClickedColor(3);

buttonStart.addEventListener('click', () => {
    document.querySelector('.welcome-modal').style.display = 'none';
    
    setTimeout(() => {
        startGame();
    }, 700);
});

buttonStop.addEventListener('click', () => {
    document.querySelector('.welcome-modal').style.display = 'block';
    document.querySelector('.content span').innerText = "Let's Start!";
    document.querySelector('.button:first-child').style.display = 'none';
    document.querySelector('.button:last-child').innerText = 'Start';
});