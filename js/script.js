let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let indexOfCorrect = [];
let black = 0;
let white = 0;
let round = 1;
let results = [];
let feedback = $(".feedback_container");
let pinSelect;
let pinColor;
let pinNum;

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
        case "s_red":
            guess.push(0);
            break;
        case "s_blue":
            guess.push(1);
            break;
        case "s_green":
            guess.push(2);
            break;
        case "s_yellow":
            guess.push(3);
            break;
        case "s_purple":
            guess.push(4);
            break;
        case "s_orange":
            guess.push(5);
            break;
    }
}

// // // function to check for win
function checkWin() {
    answer.forEach((el, i) => {
        if (el == guess[i]) {
            feedback.text("Winner winner chicken bagel dinner");
            $("#check").off("click");
        } else {
            if (round == 10) {
                feedback.text("Loser Schmooozer");
            } else {
                feedback.text("Try again sucker");
                guess = [];
            }
        }
    })
    round++;
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

// check button on click
$("#check").click(function() {
    if (checkGuessLength() == true) {
        if (round < 11) {
            getGuessResults();
            changeRoundPins();
            changeBackToBlack();
            checkWin();
        } else {
            $("#check").off("click");
        }
    } else {
        feedback.text("CHOOSE MORE PINS DUMBASS");
    }
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
    setAnswer();
    changeAllToBlack();
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
}

$("#instructions").click(function() {
    swal({
        content: "text",
        title: "Break the code!",
        text: "You have 10 turns. Black pins represent the correct colored pin, in the correct place. White pins mean you have the correct colored pin, in the wrong place.",
        buttons: {
            confirm : {text:"PLAY TIME", className:"sweet-hover"}
        },
      });
})

// gets id of clicked div
$(".guess_pin").click(function(event) {
    pinSelect = event.target.id;
    console.log("pinselected: " + event.target.id );
  });


// // // function to select pin color guess
$(".selector_pin").click(function(event) {
    if (pinSelect == undefined) {
        let id = $(this).attr("id");
        if (guess.length < 4) {
            colorClicked(id);
            let pinNum = guess.length;
            let color = guess[guess.length - 1];
            changePinColor(pinNum, color, "#guess");
            // pinSelect = undefined;
            // console.log("pin select after click:" + pinSelect);
        }
    // } else {
    //     pinColor = event.target.id;
    //     console.log("color selected: " + pinColor);
    //     let color = getColorId(pinColor);
    //     console.log("color:" + color);
    //     $(`#${pinSelect}`).css("background-color", color);
    //     pinSelect = undefined;
    // }
    }
});

function getColorId(x) {
    switch (x) {
        case "s_red":
            return color = "#ff8097";
        case "s_orange":
            return color = "#ffa66b";
        case "s_yellow":
            return color = "#ffe992";
        case "s_blue":
            return color = "#92d6e2";
        case "s_green":
            return color = "#9fec98";
        case "s_purple":
            return color = "#a38add";
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

// // function to update guess array
// function to change pin color and array item in guess