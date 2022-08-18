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
        let message='';
        if(this.pastGuesses.includes(this.playersGuess)){
            message="You have already guessed that number.";
        }else if(guess===this.winningNumber){
            message='You Win!';
        }else{
            this.pastGuesses.push(guess);
            if(this.pastGuesses.length===5){
                message='You Lose.';
            }else{
                const diff=this.difference();
                if(diff<10) message="You're burning up!";
                else if(diff<25) message="You're lukewarm.";
                else if(diff<50) message="You're a bit chilly.";
                else message="You're ice cold!";
            };
        };
        return message;
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
    const guessButton=document.getElementById('submit-guess-button');
    guessButton.addEventListener('click',function(){
        const guess=Number(document.getElementById('enter-guess-form').value);
        const result=game.playersGuessSubmission(guess);
        if(!(result==='You Win!')){
            const incorrectGuessBox=document.getElementById(`incorrect-guess-box-${game.pastGuesses.length}`); //update 'incorrect guess' box background color
            incorrectGuessBox.style.background='#FC8571';
            const incorrectGuessBoxHeading=document.getElementById(`incorrect-guess-${game.pastGuesses.length}`); //update 'incorrect guess' box heading
            incorrectGuessBoxHeading.innerHTML=guess;
        };
        document.getElementById('message').innerHTML=result; //update message heading
        guessForm.value='';
    });
    // get a hint
    const hintButton=document.getElementById('hint-button');
    hintButton.addEventListener('click',function(){
        const hintArray=game.provideHint();
        const hintString=`The winning number is either ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}.`;
        document.getElementById('message').innerHTML=hintString; //update hint heading
    });
    // reset the game
    const playAgainButton=document.getElementById('play-again-button');
    playAgainButton.addEventListener('click',function(){
        game = newGame();
        document.getElementById('message').innerHTML='Pick a number 1-100. You have five guesses!'; // reset message heading
        const incorrectGuessBoxes=document.getElementsByClassName('incorrect-guess-box');// reset 'incorrect guess' box background colors
        Array.prototype.forEach.call(incorrectGuessBoxes,box=>box.style.background='#98D7E6');
        const incorrectGuessHeadings=document.getElementsByClassName('incorrect-guess'); // reset 'incorrect guess' box headings
        Array.prototype.forEach.call(incorrectGuessHeadings,heading=>heading.innerHTML='?');
    });
// final closing bracket
};

// start new game when page loads
playGame();