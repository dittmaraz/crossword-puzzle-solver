const chalk = require('chalk');
const questions = require('questions')

let words = [];
let letters = [];
let correctWords = [];
// * Inputs a file path OR
// * Asks for a comma-delim list of words, and a comma-delim list of letters
if (process.argv.length > 2){
	//readFile(process.argv(2))
	console.log('readfile mode')
}else{
	questions.askMany({
		words: {info:"Enter a comma-delimited list of words from the crossword puzzle:"},
		letters: {info:"Enter the call letters from the crossword puzzle:"},
	},function(result){
		words = trimArray(result.words.split(","));
        letters = trimArray(result.letters.split(','));
        
        var words_solved = [];
        for (x = 0; x < words.length;x++){    
            words_solved.push(solveCrosswordWord(words[x].trim(),letters));
        };

        for (y = 0; y < words_solved.length; y++){
            printXWord(words_solved[y]);
            if (isWholeCorrectWord(words_solved[y]) === true){
                correctWords.push(words_solved[y]);
            }
        }
        var log;
        console.log("");
        if (correctWords.length > 0){
            for (x = 0; x < correctWords.length;x++){
                if (x !== correctWords.length && x !== 0){
                    log +=  + ", "
                }
                log += correctWords[x]
            }
            console.log(chalk.green("Complete Words:", log));
        }
    })
};

function solveCrosswordWord(word, call_letters) {
    var arrWord = Array.from(word);                   // 's' 't' 'o' 'r' 'k'
    var arrXWordLetters = [];                         // array of XWordLetters
    var xwordletter;                                  // single XWordLetter
    var x, y;
    for (x = 0; x < arrWord.length; x++){             // loop thru word's letters, 'stork'
        xwordletter = {                               // fill xwordletteer, leaving 'correct' false unless letter is found
            letter: arrWord[x],                       
            correct: false
        }
        for (y = 0; y < call_letters.length; y++){    // loop thru call letters
            
            if (arrWord[x] === call_letters[y]){      // if letter is found among call letters...
                xwordletter.correct = true;           // set correct to true
                break;
            }
        }
        arrXWordLetters.push(xwordletter)             // push xwordletter onto array
    }
    return arrXWordLetters                             // return array of xwordletters

}


function printXWord(xword) {
    var out = '';
    const boxen = require('boxen')
    for (z = 0; z < xword.length; z++){
        if (xword[z].correct) {
            out += chalk.green(xword[z].letter) + ' ';
            
        }else{
            out += xword[z].letter + ' ';
        }
    }
    console.log(out);
}
function trimArray(arr){
    var x = 0;
	for (x = 0; x < x.length;x++){
		arr(x) = arr(x).trim();
	}
	return arr;
}
function isWholeCorrectWord(xword){
    var cnt = 0;
    for (var x = 0; x < xword.length;x++){
        if (xword[x].correct === true){
            cnt++;
            if (cnt === xword.length){
                return true;
            }
        }
    }

}