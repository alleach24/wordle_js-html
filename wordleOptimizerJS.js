console.log('testing testing')

import {SOLUTIONWORDS} from "./solution_words.js"
import {GUESSWORDS} from "./guess_words.js"


const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let gameSolution = SOLUTIONWORDS[Math.floor(Math.random() * SOLUTIONWORDS.length)]

console.log("solution word: " + gameSolution)

// get letter input from user's keyboard
document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) { return }

    let pressedKey = String(e.key)
    console.log(pressedKey)

    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    } 
})


// get letter input from clicking the on-screen keyboard
document.getElementById("keyboard-container").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }

    let key = target.textContent
    if (key === "Del") {
        key = "Backspace"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

document.getElementById("random").addEventListener("click", (e) => {
    // const target = e.target
    
    guessesRemaining = NUMBER_OF_GUESSES;
    currentGuess = [];
    nextLetter = 0;
    gameSolution = SOLUTIONWORDS[Math.floor(Math.random() * SOLUTIONWORDS.length)]
    resetKeyboard()
    resetGameboard()
    console.log("new game")
    console.log("solution word: " + gameSolution)
})
document.getElementById("custom").addEventListener("click", (e) => {
    guessesRemaining = NUMBER_OF_GUESSES;
    currentGuess = [];
    nextLetter = 0;
    // gameSolution = SOLUTIONWORDS[Math.floor(Math.random() * SOLUTIONWORDS.length)]
    
    resetKeyboard()
    resetGameboard()
    console.log("new game")
    console.log("solution word: " + gameSolution)
})

function resetKeyboard() {
    let keys = document.getElementsByClassName("keyboard-button")
    for (let i = 0; i < keys.length; i++) {
        keys[i].style.backgroundColor = ''
        keys[i].style.color = ''
    }
}

function resetGameboard() {
    let rows = document.getElementsByClassName("letter-row")
    for (let i = 0; i < rows.length; i++) {
        let boxes = rows[i].children
        for (let j = 0; j < boxes.length; j++) {
            boxes[j].style.backgroundColor = 'white'
            boxes[j].style.color = 'black'
            boxes[j].style.border = '2px solid rgb(194, 194, 194)'
            boxes[j].textContent = ''
        }
    }
}



function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6-guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}
function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    for (const letter of currentGuess) {
        guessString += letter
    }
    console.log("guess: " + guessString)
    let solution = Array.from(gameSolution)

    // check if the guess is 5 letters long and in the guess word bank (i.e. is a valid guess)
    if (guessString.length != 5) {
        alert("Not enough letters!")
        console.log("Not enough letters")
        return
    }
    if (!GUESSWORDS.includes(guessString)) {
        alert("Not a valid guess")
        console.log("Not a valid guess")
        return
    }

    console.log(currentGuess)
    console.log(solution)

    let colorCode = buildColorCode(currentGuess, solution)
    console.log("color code: " + colorCode)
    changeBoardColors(colorCode, row)
    

    if(guessString === gameSolution) {
        // alert("You guessed right! Game over!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1
        currentGuess = []
        nextLetter = 0

        if (guessesRemaining === 0) {
            alert("You've run out of guesses. The right word was '" + gameSolution + "'")
        }
    }

}
function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }

    pressedKey = pressedKey.toLowerCase()
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function changeBoardColors(colorCode, row) {
    for (let i = 0; i < 5; i++) {
        let box = row.children[i]
        box.style.color = 'white'
        shadeKeyboard(currentGuess[i], colorCode[i])
        if (colorCode[i] === '0') {
            box.style.backgroundColor = 'gray'
            box.style.border = '2px solid gray'
        } else if (colorCode[i] === '1') {
            box.style.backgroundColor = '#b59f3b'
            box.style.border = '2px solid #b59f3b'
        } else if (colorCode[i] === '2') {
            box.style.backgroundColor = '#6aaa64'
            box.style.border = '2px solid #6aaa64'
        } else {
            box.style.backgroundColor = 'blue'
        }
    }
}

function shadeKeyboard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            elem.style.color = 'white'
            let oldColor = elem.style.backgroundColor
            console.log("old color" + oldColor)
            if (oldColor === 'rgb(106, 170, 100)') {
                return
            } else if (oldColor === 'rgb(181, 159, 59)' && color !== '2') {
                return
            } else {
                if (color === '0') { elem.style.backgroundColor = 'gray'}
                if (color === '1') { elem.style.backgroundColor = '#b59f3b'}
                if (color === '2') { elem.style.backgroundColor = '#6aaa64'}
            }
        }
    }
}





function buildColorCode(guess, solution) {
    // console.log(guess)
    // console.log(solution)

    let colorCodeArr = ['','','','','']
    let solutionWithoutGreens = {}

    for (let i=0; i < 5; i++) {
        if (guess[i] == solution[i]) {colorCodeArr[i]= '2';}
        else if (!solution.includes(guess[i])) {
            colorCodeArr[i] ='0';
            solutionWithoutGreens[solution[i]] = solutionWithoutGreens[solution[i]] +1 || 1;
            // solutionWithoutGreens[i] = solution[i];
        }
        else { 
            solutionWithoutGreens[solution[i]] = solutionWithoutGreens[solution[i]] +1 || 1;
        }
    }

    // console.log(solutionWithoutGreens)
    // console.log(colorCodeArr)

    for (let j=0; j < 5; j++) {
        if (colorCodeArr[j] == '') {
            if (!solutionWithoutGreens.hasOwnProperty(guess[j]) || solutionWithoutGreens[guess[j]] == 0) {
                colorCodeArr[j] = '0'
            } else {
                colorCodeArr[j] = '1';
                solutionWithoutGreens[guess[j]] = solutionWithoutGreens[guess[j]] -1
                // console.log(solutionWithoutGreens)
            }
        }
    }

    // console.log(colorCodeArr.join(''))
    return colorCodeArr.join('')
}

// buildColorCode(['a','b','c','d','e'],['e','d','c','b','x'])
// buildColorCode(['k','a','y','a','k'],['a','w','a','k','e'])


function evaluateWord(guess, possibleSolutionsList) {
    let buckets = {'00000': 0, '00001': 0, '00002': 0, '00010': 0, '00011': 0, '00012': 0, 
    '00020': 0, '00021': 0, '00022': 0, '00100': 0, '00101': 0, '00102': 0, '00110': 0, 
    '00111': 0, '00112': 0, '00120': 0, '00121': 0, '00122': 0, '00200': 0, '00201': 0, 
    '00202': 0, '00210': 0, '00211': 0, '00212': 0, '00220': 0, '00221': 0, '00222': 0, 
    '01000': 0, '01001': 0, '01002': 0, '01010': 0, '01011': 0, '01012': 0, '01020': 0, 
    '01021': 0, '01022': 0, '01100': 0, '01101': 0, '01102': 0, '01110': 0, '01111': 0, 
    '01112': 0, '01120': 0, '01121': 0, '01122': 0, '01200': 0, '01201': 0, '01202': 0, 
    '01210': 0, '01211': 0, '01212': 0, '01220': 0, '01221': 0, '01222': 0, '02000': 0, 
    '02001': 0, '02002': 0, '02010': 0, '02011': 0, '02012': 0, '02020': 0, '02021': 0, 
    '02022': 0, '02100': 0, '02101': 0, '02102': 0, '02110': 0, '02111': 0, '02112': 0, 
    '02120': 0, '02121': 0, '02122': 0, '02200': 0, '02201': 0, '02202': 0, '02210': 0, 
    '02211': 0, '02212': 0, '02220': 0, '02221': 0, '02222': 0, '10000': 0, '10001': 0, 
    '10002': 0, '10010': 0, '10011': 0, '10012': 0, '10020': 0, '10021': 0, '10022': 0, 
    '10100': 0, '10101': 0, '10102': 0, '10110': 0, '10111': 0, '10112': 0, '10120': 0, 
    '10121': 0, '10122': 0, '10200': 0, '10201': 0, '10202': 0, '10210': 0, '10211': 0, 
    '10212': 0, '10220': 0, '10221': 0, '10222': 0, '11000': 0, '11001': 0, '11002': 0, 
    '11010': 0, '11011': 0, '11012': 0, '11020': 0, '11021': 0, '11022': 0, '11100': 0, 
    '11101': 0, '11102': 0, '11110': 0, '11111': 0, '11112': 0, '11120': 0, '11121': 0, 
    '11122': 0, '11200': 0, '11201': 0, '11202': 0, '11210': 0, '11211': 0, '11212': 0, 
    '11220': 0, '11221': 0, '11222': 0, '12000': 0, '12001': 0, '12002': 0, '12010': 0, 
    '12011': 0, '12012': 0, '12020': 0, '12021': 0, '12022': 0, '12100': 0, '12101': 0, 
    '12102': 0, '12110': 0, '12111': 0, '12112': 0, '12120': 0, '12121': 0, '12122': 0, 
    '12200': 0, '12201': 0, '12202': 0, '12210': 0, '12211': 0, '12212': 0, '12220': 0, 
    '12221': 0, '12222': 0, '20000': 0, '20001': 0, '20002': 0, '20010': 0, '20011': 0, 
    '20012': 0, '20020': 0, '20021': 0, '20022': 0, '20100': 0, '20101': 0, '20102': 0, 
    '20110': 0, '20111': 0, '20112': 0, '20120': 0, '20121': 0, '20122': 0, '20200': 0, 
    '20201': 0, '20202': 0, '20210': 0, '20211': 0, '20212': 0, '20220': 0, '20221': 0, 
    '20222': 0, '21000': 0, '21001': 0, '21002': 0, '21010': 0, '21011': 0, '21012': 0, 
    '21020': 0, '21021': 0, '21022': 0, '21100': 0, '21101': 0, '21102': 0, '21110': 0, 
    '21111': 0, '21112': 0, '21120': 0, '21121': 0, '21122': 0, '21200': 0, '21201': 0, 
    '21202': 0, '21210': 0, '21211': 0, '21212': 0, '21220': 0, '21221': 0, '21222': 0, 
    '22000': 0, '22001': 0, '22002': 0, '22010': 0, '22011': 0, '22012': 0, '22020': 0, 
    '22021': 0, '22022': 0, '22100': 0, '22101': 0, '22102': 0, '22110': 0, '22111': 0, 
    '22112': 0, '22120': 0, '22121': 0, '22122': 0, '22200': 0, '22201': 0, '22202': 0, 
    '22210': 0, '22211': 0, '22212': 0, '22220': 0, '22221': 0, '22222': 0}

    possibleSolutionsList.forEach(possibleSolution => {
        let colorCode = buildColorCode(guess, possibleSolution)
        buckets[colorCode] += 1
    })

    // console.log(buckets)
    return buckets
}

// let testBuckets = evaluateWord(['r','o','a','t','e'], starting_possible_solutions_list)


function calculateStandardDeviation(buckets) {
    let bucketVals = Object.values(buckets)
    let mean = bucketVals.reduce((partialSum,a) => { return partialSum+a }, 0) / bucketVals.length;

    return Math.sqrt(bucketVals.reduce((partialSum,a)=> partialSum+((a - mean) ** 2),0) / bucketVals.length)
}

// calculateStandardDeviation(testBuckets)


function findOptimalWords(possible_solutions_list) {
    let stdDevs = {}

    possible_guesses_list.forEach(guess => {
        stdDevs[guess.join('')] = calculateStandardDeviation(evaluateWord(guess,possible_solutions_list))
    })
    let minStdDev = Math.min(...Object.values(stdDevs))
    let bestGuesses = Object.keys(stdDevs).filter(word => stdDevs[word] == minStdDev)
    return bestGuesses
}

// console.log(findOptimalWords(starting_possible_solutions_list))


function determinePossibleSolutions(guess,ans,possibleSolutions) {
    let newPossibleSolutions = []
    let colorCode = buildColorCode(guess,ans)

    possibleSolutions.forEach(word => {
        let testColorCode = buildColorCode(guess,word);
        if (testColorCode == colorCode) {
            newPossibleSolutions.push(word)
        }
    })
    return newPossibleSolutions
}

// console.log(determinePossibleSolutions(['r','o','a','t','e'],['r','a','i','n','y'], starting_possible_solutions_list))

function validateInput() {
    return
}

function play() {
    return
}