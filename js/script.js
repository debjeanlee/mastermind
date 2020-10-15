let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let indexOfCorrect = [];
let black = 0;
let white = 0;
let round = 1;
let results = [];
let feedback = $(".feedback_container");
let win;
let selectedGuessPin;
let col_id;
let emptyPin;

// // // sets random answer chosen by computer
function setAnswer() {
    for (let x = 0; x < 4; x++) {
        let colorIndex = Math.floor(Math.random() * 6);
        answer.push(colorIndex);
        // console.log(answer);
    }

    // answer.forEach((el, i) => {
    //     changePinColor(i+1, el, "#answer")
    // })
}

// // //changes individual pin color with pin number, color index and selector
function changePinColor(pinNum, colorInd, id) {
    let pin = document.querySelector(`${id} div:nth-child(${pinNum})`);
    switch (answerChoices[colorInd]) {
        case "red":
            pin.style.backgroundColor = "#ff8097";
            break;
        case "orange":
            pin.style.backgroundColor = "#ffa66b";
            break;
        case "yellow":
            pin.style.backgroundColor = "#ffe992";
            break;
        case "blue":
            pin.style.backgroundColor = "#92d6e2";
            break;
        case "green":
            pin.style.backgroundColor = "#9fec98";
            break;
        case "purple":
            pin.style.backgroundColor = "#a38add";
            break;
    }
}

setAnswer();


// // // function to add clicked color to guess arr
function colorClicked(id) {
    switch (id) {
        case "red":
            guess.push(0);
            break;
        case "blue":
            guess.push(1);
            break;
        case "green":
            guess.push(2);
            break;
        case "yellow":
            guess.push(3);
            break;
        case "purple":
            guess.push(4);
            break;
        case "orange":
            guess.push(5);
            break;
    }
}

// // // function to check for win
function checkWin() {
    answer.forEach((el, i) => {
        if (el == guess[i]) {
            feedback.text("Winner winner chicken bagel dinner");
            win = true;
        } else {
            if (round == 10) {
                feedback.text("Loser Schmooozer");
            } else {
                feedback.text("Try again sucker");
                guess = [];
            }
            win = false;
        }
    })
    // round++;
    // console.log("round" + round);
    return win;
}


// NEED FUNCTION TO CHANGE COLORS OF PINS ON BOARDS
function changeRoundPins () {
    guess.forEach((el, i) => {
        let id = "#guess"+round;
        let pinBgCheck = $("#b"+round);
        if (pinBgCheck.css("background-color") == "rgb(207, 187, 165)") {
            guess.forEach((el, i) => {
                changePinColor(i+1, el, id);
            })
    }
})
}

// check if guess length is correct
function checkGuessLength() {
    if (guess.length == answer.length) {
        return true;
    } else {
        return false;
    }
}

//  changes guess pins back to black
function changeBackToBlack() {
    for (let x = 1; x < 5; x++) {
        let pin = $(`#guess div:nth-child(${x})`);
        pin.css("background-color","rgb(207, 187, 165)");
    }
}

// function to delete last item
function removeLastGuess() {
    guess.pop();
    let x = guess.length;
    let id = $(`#${x+1}`);
    id.css("background-color", "rgb(207, 187, 165)");
}

$("#clear").click(function() {
    removeLastGuess();
})

function check() {
    if (checkGuessLength() == true) {
        if (round < 11) {
            getGuessResults();
            changeRoundPins();
            changeBackToBlack();
            checkWin();
            if (win == true) {
                $("#check").off("click");
            } else {
                round++;
            }
            // console.log("round" + round);
        } 
    } else {
        feedback.text("CHOOSE MORE PINS DUMBASS");
    }
}

// check button on click
$("#check").click(function() {
    check();
})

// function to assign result pins
function getGuessResults() {
    // creates new arrays from answer and guess
    let ans = Array.from(answer);
    let gs = Array.from(guess);

    // check for black pins
    gs.forEach((el, i) => {
        if (el == ans[i]) {
            indexOfCorrect.push(i);
            results.push("black");
        } 
    })

    // remove correct answers from arrays
    let removeItems = indexOfCorrect.reverse();

    removeItems.forEach(el => {
        ans.splice(el, 1);
        gs.splice(el, 1);
    })

    // sort guess arr without black answers so we start with biggest number
    gs.sort();
    ans.sort();
    
    // for each element of gs, if ans includes ele, push white to results, else increase wrong count;
    gs.forEach((el, i) => {
        if (ans.includes(el)) {
            results.push("white");
            let indOfEl = ans.indexOf(el);
            ans.splice(indOfEl, 1);
         } 
    })
    
    changeResultPins();
    results = [];
    indexOfCorrect = [];
}

function changeResultPins () {
    results.forEach((el, i) => {
        let pin = $(`#ans${round} div:nth-child(${i+1})`);
        pin.css("background-color", el);
    })
}

$("#reset").click(function() {
    answer = [];
    guess = [];
    indexOfCorrect = [];
    black = 0;
    white = 0;
    round = 1;
    results = [];
    feedback.text("New game loaded");
    win = undefined;
    selectedGuessPin = undefined;
    col_id = undefined;
    setAnswer();
    changeAllToBlack();
    $("#check").click(function() {
        check();
    })    
})

function changeAllToBlack() {
    for (let i = 1; i < 11; i++) {
        for (let x = 1; x < 5; x++) {
            let pin = $(`#guess${i} div:nth-child(${x})`);
            pin.css("background-color","rgb(207, 187, 165)");
        }
    }
    for (let i = 1; i < 11; i++) {
        for (let x = 1; x < 5; x++) {
            let pin = $(`#ans${i} div:nth-child(${x})`);
            pin.css("background-color","rgb(238, 207, 172)");
        }
    }
    for (let i = 1; i < 5; i++) {
        let pin = $(`#guess div:nth-child(${i})`);
        pin.css("background-color","rgb(207, 187, 165)");
    }
}



// //  uhhhh maybe later 
// function to change pin color and array item in guess


$("#instructions").click(function() {
    swal({
        content: "text",
        title: "Instructions",
        text: "You have 10 turns. Black pins represent the correct colored pin, in the correct place. White pins mean you have the correct colored pin, in the wrong place.",
        buttons: {
            confirm : {text:"PLAY TIME", className:"sweet-hover "}
        },
      });
})


// // to store selected guess pin on click
$("body").click(function(event) {
    selectedGuessPin = event.target.id;
    // console.log("seledtedguesspin: " + selectedGuessPin);
})


$(".selector_pin").click(function(event) {
    let pin = selectedGuessPin;
    // console.log("pin: " + pin);
    let clickedId = this.id
    // console.log("clickedId (this.id): " + clickedId);
    let pushToGuess = indexOfClickedColor(clickedId);
    // console.log("ID: " + col_id);

    // console.log("guess length: " + guess.length);

    if (selectedGuessPin == "1" || selectedGuessPin == "2" || selectedGuessPin == "3" || selectedGuessPin == "4") {
        // need to get id of clicked color
        $(`#${col_id}`).css("background-color");
        changePinColor(pin, col_id, "#guess");
        updateGuess(pushToGuess);
    } 
    // ADD ANOTHER ELSE IF TO CHECK FOR BLANKS
    else {
        if (guess.length == 0) {
            colorClicked(clickedId);
            let pinNum = guess.length;
            let color = guess[guess.length - 1];
            changePinColor(pinNum, color, "#guess");
            // console.log(guess);
        } else {
        //    check where blank pin is
        // console.log("guess arr: " + guess);
        // console.log("emptypin before: " + emptyPin);
        findEmptyPin();
        updateGuess(pushToGuess);
        changePinColor(emptyPin, col_id, "#guess");
        }
    }
    // console.log(emptyPin);
    // console.log("guess: " + guess);
});

function findEmptyPin() {
    for (let i = 3; i > -1; i--) {
        if (guess[i] == null) {
            emptyPin = i+1;
            // console.log("emptypin: " + emptyPin);
        }
    } return emptyPin;
}



function indexOfClickedColor(clickedId) {
    switch (clickedId) {
        case "red":
            return col_id = 0;
        case "blue":
            return col_id = 1;
        case "green":
            return col_id = 2;
        case "yellow":
            return col_id = 3;
        case "purple":
            return col_id = 4;
        case "orange":
            return col_id = 5;
    }
}

// UPDATE ARRAY
function updateGuess(x) {
    if (selectedGuessPin == "1" || selectedGuessPin == "2" || selectedGuessPin == "3" || selectedGuessPin == "4") {
        let index = selectedGuessPin - 1;
        // console.log("index: " + index);
        if (guess.length == 0) {
            if (selectedGuessPin == 4) {
                guess.push(null, null, null, x);
            } else if (selectedGuessPin == 3) {
                guess.push(null, null, x, null);
            } else if (selectedGuessPin == 2) {
                guess.push(null, x, null, null);
            } else {
                guess.push(x);
            }
        } else if (guess.length == 1) {
            if (selectedGuessPin == 2) {
                guess.push(x);
            } else if (selectedGuessPin == 3) {
                guess.push(null, x);
            } else if (selectedGuessPin == 4) {
                guess.push(null, null, x);
            }
        } else if (guess.length == 2) {
            if (selectedGuessPin == 3) {
                guess.push(x);
            } else if (selectedGuessPin == 4) {
                guess.push(null, x);
            }
        } else {
            guess.splice(index, 1, x);
        }
    } else {
        let index = emptyPin - 1;
        guess.splice(index, 1, x);
    }
}