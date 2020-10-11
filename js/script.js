let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let results =[];
let round = 1;
let feedback = $(".feedback_container");


// // // sets random answer chosen by computer
function setAnswer() {
    for (let x = 0; x < 4; x++) {
        let colorIndex = Math.floor(Math.random() * 6);
        answer.push(colorIndex);
        // console.log(answer);
    }

    answer.forEach((el, i) => {
        changePinColor(i+1, el, "#answer")
    })
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

// // // function to select pin color guess
$(".selector_pin").click(function() {
    let id = $(this).attr("id");
    if (guess.length < 4) {
        colorClicked(id);
        let pinNum = guess.length;
        let color = guess[guess.length - 1];
        changePinColor(pinNum, color, "#guess");
        // console.log(guess);
    }
});


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
    if (answer.length == guess.length) {
        answer.forEach((el, i) => {
            if (el == guess[i]) {
                changeRoundPins();
                feedback.text("Winner Winner Chicken Eats Dinner");
            } else {
                feedback.text("Try again sucker");
                changeRoundPins();
                guess = [];
                changeBackToBlack();
            }
        })
        round++;
    } else {
        console.log(guess.length);
        feedback.text("Not enough pins chosen moron");
    }
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

function changeBackToBlack() {
    for (let x = 1; x < 5; x++) {
        let pin = $(`#guess div:nth-child(${x})`);
        pin.css("background-color","rgb(207, 187, 165)");
    }
}


$("#check").click(function() {
    checkWin();
})


// // // TO DO
// SHOW RESULT PINS
// CHANGE PIN COLORS OF RESULT PINS
// FUNCTION TO COMPARE RESULTS INDIV

// RESET GAME BUTTON
// DELETE BUTTON
// INSTRUCTIONS POP UP?