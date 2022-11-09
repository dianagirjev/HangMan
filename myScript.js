let introduceWordHeading = document.getElementById("introduceWordHeading");
let wordForGuessing = document.getElementById("wordForGuessing");
let submitWordButton = document.getElementById("submitWordButton");
let selectLetterHeading = document.getElementById("selectLetterHeading");
let startButton = document.getElementById("startButton");

function startIntroPage() {
    togglePageVisibility("startIntroPage");
    startButton.addEventListener("click", () => readSubmittedWord());
}

function readSubmittedWord() {
    togglePageVisibility("readSubmittedWord");
    submitWordButton.addEventListener("click", () => startGame());
}

let wordForGuessingValue;

function startGame() {
    wordForGuessingValue = document.getElementById("wordForGuessing").value;
    if (wordForGuessingValue != "") {
        togglePageVisibility("startGame");
        createLettersButtons();
        createLettersBoxesAndCanvas();
    } else {
        alert("You should introduce a word in the field bellow.");
    }
}

let containerId = document.getElementById("containerId");

function createLettersButtons() {
    let lettersString = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < lettersString.length; ++i) {
        let letterButton = document.createElement("button");
        letterButton.className = "btn btn-outline-dark";
        letterButton.innerText = lettersString[i];
        letterButton.id = lettersString[i] + "Button";
        letterButton.addEventListener("click", () => {if (checkEnoughLives()) {
                                                          findPressedLetter(letterButton.id, lettersString[i])
                                                      } else {
                                                          openWonOrLostGamePage()
                                                      }})
        containerId.appendChild(letterButton);
    }
}

let canvas;

function createLettersBoxesAndCanvas() {
    canvas = document.createElement("div");
    canvas.className = "imageCanvas";
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

function checkEnoughLives() {
    if (counter < maxGuesses && guessedLetters < wordForGuessingValue.length) {
        return true;
    } 
    return false;
}

function findPressedLetter(userInput, inputLetter) {
    let pressedButton = document.getElementById(userInput);
    pressedButton.style.display = "none";
    let found = 0;
    for (let i = 0; i < wordForGuessingValue.length; ++i) {
        if ('A' <= wordForGuessingValue[i] && wordForGuessingValue[i] <= 'Z') {
            inputLetter = inputLetter.toUpperCase();
        }
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
        openWonOrLostGamePage();
    }
}

let finish = false;

function openWonOrLostGamePage() {
    let messageToUserButton = document.createElement("button");
    messageToUserButton.className = "btn btn-outline-dark";
    if (guessedLetters == wordForGuessingValue.length && finish == false) {
        togglePageVisibility("wonGamePage");
        messageToUserButton.innerText = "Contratulation you won the game!!! Click HERE to play one more time.";
        messageToUserButton.addEventListener("click", () => window.location.reload());
        containerId.appendChild(messageToUserButton);
        finish = true;
    } else if (finish == false) {
        togglePageVisibility("lostGamePage");
        for (let i = 0; i < wordForGuessingValue.length; ++i) {
            let letterBox = document.getElementById(wordForGuessingValue[i] + i + "Box");
            letterBox.style.display = "none";
        }
        messageToUserButton.innerText = "I am sorry you lost the game, the word for guessing was \"" + wordForGuessingValue + "\". Click HERE to play one more time.";
        messageToUserButton.addEventListener("click", () => window.location.reload());
        containerId.appendChild(messageToUserButton);
        finish = true;
    }
}

function togglePageVisibility(pageName) {
    switch (pageName) {
        case "startIntroPage":
            introduceWordHeading.style.display = "none";
            wordForGuessing.style.display = "none";
            submitWordButton.style.display = "none";
            selectLetterHeading.style.display = "none";
            break;
        case "readSubmittedWord":
            startButton.style.display = "none";
            introduceWordHeading.style.display = "block";
            wordForGuessing.style.display = "block";
            submitWordButton.style.display = "block";
            break;
        case "startGame":
            introduceWordHeading.style.display = "none"; 
            wordForGuessing.style.display = "none";
            submitWordButton.style.display = "none";
            selectLetterHeading.style.display = "block";
            break;
        case "wonGamePage":
            canvas.style.display = "none";
            selectLetterHeading.style.display = "none";
            break;
        case "lostGamePage":
            selectLetterHeading.style.display = "none";
            break;
    }
}

startIntroPage();