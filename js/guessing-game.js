// Game class
class Game{
    constructor(){
        this.playersGuess=null;
        this.pastGuesses=[];
        this.winningNumber=generateWinningNumber();
    };
    playersGuessSubmission(guess){
        if(typeof guess==='number' && guess>=1 && guess<=100){
            this.playersGuess=guess;
            return this.checkGuess(guess);
        }else{
            throw 'That is an invalid guess.';
        };
    };
    checkGuess(guess){
        if(this.pastGuesses.includes(this.playersGuess)){
            return "You have already guessed that number.";
        }else if(guess===this.winningNumber){
            return 'You Win!';
        }else{
            this.pastGuesses.push(guess);
            if(this.pastGuesses.length===5){
                return 'You Lose.';
            }else{
                const diff=this.difference();
                if(diff<10){
                    return "You're burning up!"
                }else if(diff<25){
                    return "You're lukewarm."
                }else if(diff<50){
                    return "You're a bit chilly."
                }else{
                    return "You're ice cold!"
                }; 
            };
        };
    };
    difference(){
        return Math.abs(this.playersGuess-this.winningNumber);
    };
    isLower(){
        return this.playersGuess<this.winningNumber;
    };
    provideHint(){
        const hintArray=[this.winningNumber,generateWinningNumber(),generateWinningNumber()];
        return shuffle(hintArray);
    };
};

// generate winning number
function generateWinningNumber(){
    return Math.floor(Math.random()*100)+1;
};

// shuffle function
function shuffle(array){
    var m=array.length,t,i;
    while(m){
      i= Math.floor(Math.random()*m--);
      t=array[m];
      array[m]=array[i];
      array[i]=t;
    };
    return array;
  };

// new game function
function newGame(){
    return new Game;
};

// start new game
function playGame(){
    let game=newGame();
    
    // guess a number
    let guessButton=document.getElementById('submit-guess-button');
    guessButton.addEventListener('click',function(){
        const guessForm=document.getElementById('enter-guess-form');
        const guess=Number(guessForm.value);
        guessForm.value='';
        let result=game.playersGuessSubmission(guess);
        if(!(result==='You Win!')){
            let incorrectGuessBox=document.getElementById(`incorrect-guess-box-${game.pastGuesses.length}`);
            incorrectGuessBox.style.background='#FC8571';
            let incorrectGuessHeading=document.getElementById(`incorrect-guess-${game.pastGuesses.length}`);
            incorrectGuessHeading.innerHTML=guess;
        };
        let messageText=document.getElementById('message');
        messageText.innerHTML=result;
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
        messageText.innerHTML='Pick a number 1-100. You have five guesses!';
        // reset 'incorrect guess' boxes background color
        const incorrectGuessBoxes=document.getElementsByClassName('incorrect-guess-box');
        Array.prototype.forEach.call(incorrectGuessBoxes,box=>box.style.background='#98D7E6');
        // reset 'incorrect guess' boxes HTML
        const incorrectGuessHeadings=document.getElementsByClassName('incorrect-guess');
        Array.prototype.forEach.call(incorrectGuessHeadings,box=>box.innerHTML='?');
    });
// final closing bracket
};

// start new game when page loads
playGame();