let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let indexOfCorrect = [];
let black = 0;
let white = 0;
let wrong = 0;
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
    answer.forEach((el, i) => {
        if (el == guess[i]) {
            feedback.text("Winner winner chicken bagel dinner");
            // $("#check").off("click");
        } else {
            feedback.text("Try again sucker");
            guess = [];
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
        getGuessResults();
        changeRoundPins();
        changeBackToBlack();
        checkWin();
    } else {
        feedback.text("CHOOSE MORE PINS DUMBASS");
    }
})

// function to assign result pins
function getGuessResults() {
    // creates new arrays from answer and guess
    let ans = Array.from(answer);
    let gs = Array.from(guess);
    console.log(`initial ans/gs ${ans}, ${gs}`);

    // check for black pins
    gs.forEach((el, i) => {
        if (el == ans[i]) {
            indexOfCorrect.push(i);
            black++;
        } 
    })

    console.log(`indexOfCorr item: ${indexOfCorrect}`);

    // remove correct answers from arrays
    let removeItems = indexOfCorrect.reverse();
    console.log(`index of items to remove:${removeItems}`);
    indexOfCorrect.forEach(el => {
        ans.splice(el, 1);
        gs.splice(el, 1);
    })

    console.log(`items removed - ans: ${ans}, gs: ${gs}`);

    // sort guess arr without black answers so we start with biggest number
    gs.sort();
    ans.sort();
    
    console.log(`sorted gs - ans: ${ans}, gs: ${gs}`);
    // console.log(`length of gs ${gs.length}`);{
        gs.forEach((el, i) => {
            if (ans.includes(el)) {
                white++;
                let indOfEl = ans.indexOf(el);
                ans.splice(indOfEl, 1);
                console.log(`after last splice ${ans}`);
            } else {
                wrong++;
            }
        })
    



    // for (let i = gs.length; i > 0; i--) {
    //     let el = gs[i];
    //     if (ans.includes(el) == true) {
    //         white++;
    //         let n = ans.indexOf(el);
    //         ans.splice(n,1);
    //         // gs.splice(i,1);
    //         console.log(`removed white el ans ${ans}`);
    //         console.log(`NEXT GUESS pls guess ${gs}`);
    //     } else {
    //         wrong++;
    //     }
    // }    

    console.log(`black: ${black}, white: ${white}, wrong: ${wrong}`);
    black = 0;
    white = 0;
    wrong = 0;
    indexOfCorrect = [];
}

   

// // // TO DO
// SHOW RESULT PINS
// CHANGE PIN COLORS OF RESULT PINS
// FUNCTION TO COMPARE RESULTS INDIV

// RESET GAME BUTTON
// DELETE BUTTON
// INSTRUCTIONS POP UP