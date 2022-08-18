import {newGame} from 'guessing-game';

// start new game
function playGame(){
    let game=newGame();
    
    // guess a number
    let guessButton=document.getElementById('submit-guess-button');
    guessButton.addEventListener('click',function(){
        const guessForm=document.getElementById('enter-guess-form');
        const guess=Number(guessForm.value);
        let result=game.playersGuessSubmission(guess);
        if(!(result==='You Win!')){
            let incorrectGuessBox=document.getElementById(`incorrect-guess-box-${game.pastGuesses.length}`);
            incorrectGuessBox.style.background='#FC8571';
            let incorrectGuessHeading=document.getElementById(`incorrect-guess-${game.pastGuesses.length}`);
            incorrectGuessHeading.innerHTML=guess;
        };
        let messageText=document.getElementById('message');
        messageText.innerHTML=result;
        guessForm.value='';
    });

    // get a hint
    let hintButton=document.getElementById('hint-button');
    hintButton.addEventListener('click',function(){
        const hintArray=game.provideHint();
        const hintString=`The winning number is either ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}.`;
        let messageText=document.getElementById('message');
        messageText.innerHTML=hintString;
    });

    // reset the game
    let playAgainButton=document.getElementById('play-again-button');
    playAgainButton.addEventListener('click',function(){
        game = newGame();
        // reset message HTML
        let messageText=document.getElementById('message');
        messageText.innerHTML='Pick a number 1-100.';
        // reset 'incorrect guess' boxes background color
        const incorrectGuessBoxes=document.getElementsByClassName('incorrect-guess-box');
        for(let box of incorrectGuessBoxes){
            box.style.background='#98D7E6';
        };
        // reset 'incorrect guess' boxes HTML
        const incorrectGuessHeadings=document.getElementsByClassName('incorrect-guess');
        for(let box of incorrectGuessHeadings){
            box.innerHTML='?';
        };
    });
};

playGame();