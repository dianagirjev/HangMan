let introduceWordHeading = document.getElementById("introduceWordHeading");
let wordForGuessing = document.getElementById("wordForGuessing");
let submitWordButton = document.getElementById("submitWordButton");
let selectLetterHeading = document.getElementById("selectLetterHeading");
let startButton = document.getElementById("startButton");

function startIntroPage() {
    introduceWordHeading.style.display = "none";
    wordForGuessing.style.display = "none";
    submitWordButton.style.display = "none";
    selectLetterHeading.style.display = "none";
    startButton.addEventListener("click", () => readSubmittedWord());
}

function readSubmittedWord() {
    startButton.style.display = "none";
    introduceWordHeading.style.display = "block";
    wordForGuessing.style.display = "block";
    submitWordButton.style.display = "block";
    submitWordButton.addEventListener("click", () => startGame());
}

let canvas = document.createElement("div");

function startGame() {
    let wordForGuessingValue = document.getElementById("wordForGuessing").value;
    if (wordForGuessingValue != "") {
        introduceWordHeading.style.display = "none"; 
        wordForGuessing.style.display = "none";
        submitWordButton.style.display = "none";
        selectLetterHeading.style.display = "block";
        let containerId = document.getElementById("containerId");
        canvas.className = "imageCanvas";
        createLettersButtons(containerId, wordForGuessingValue);
        createLettersBoxesAndCanvas(containerId, wordForGuessingValue);
    } else {
        alert("You should introduce a word in the field bellow.");
    }
}

function createLettersButtons(containerId, wordForGuessingValue) {
    let lettersString = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < lettersString.length; ++i) {
        let letterButton = document.createElement("button");
        letterButton.className = "btn btn-outline-dark";
        letterButton.innerText = lettersString[i];
        letterButton.id = lettersString[i] + "Button";
        letterButton.addEventListener("click", () => checkValidityCall(letterButton.id, lettersString[i], wordForGuessingValue))
        containerId.appendChild(letterButton);
    }
}

function createLettersBoxesAndCanvas(containerId, wordForGuessingValue) {
    containerId.appendChild(canvas);
    let divRow = document.createElement("div");
    divRow.className = "row justify-content-md-center";
    for (let i = 0; i < wordForGuessingValue.length; ++i) {
        let letterBox = document.createElement("div");
        letterBox.className = "col-12";
        letterBox.id = wordForGuessingValue[i] + i + "Box";
        divRow.appendChild(letterBox);
    }
    containerId.appendChild(divRow);
}

let counter = 0;
let guessedLetters = 0;
let maxGuesses = 7;

function checkValidityCall(userInput, inputLetter, wordForGuessingValue) {
    let messageToUserButton = document.createElement("button");
    messageToUserButton.className = "btn btn-outline-dark";
    if (counter < maxGuesses && guessedLetters < wordForGuessingValue.length) {
        findPressedLetter(userInput, inputLetter, wordForGuessingValue)
    } else if (guessedLetters == wordForGuessingValue.length) {
        canvas.style.display = "none";
        selectLetterHeading.style.display = "none";
        messageToUserButton.innerText = "Contratulation you won the game!!! Click HERE to play one more time.";
        messageToUserButton.addEventListener("click", () => window.location.reload());
        containerId.appendChild(messageToUserButton);
    } else {
        selectLetterHeading.style.display = "none";
        messageToUserButton.innerText = "I am sorry you lost the game, the word for guessing was \"" + wordForGuessingValue + "\". Click HERE to play one more time.";
        messageToUserButton.addEventListener("click", () => window.location.reload());
        containerId.appendChild(messageToUserButton);
    }
}

function findPressedLetter(userInput, inputLetter, wordForGuessingValue) {
    let pressedButton = document.getElementById(userInput);
    pressedButton.style.display = "none";
    let found = 0;
    for (let i = 0; i < wordForGuessingValue.length; ++i) {
        if (inputLetter == wordForGuessingValue[i]) {
            document.getElementById(inputLetter + i + "Box").innerText = inputLetter;
            ++guessedLetters;
            found = 1;
        } else if (i == (wordForGuessingValue.length - 1) && found == 0) {
            ++counter;
            canvas.style.backgroundImage = "url('images/" + (2 + counter) + ".png')";
        }
    }
    if (counter == maxGuesses || guessedLetters == wordForGuessingValue.length) {
        checkValidityCall(userInput, inputLetter, wordForGuessingValue);
    }
}


startIntroPage();