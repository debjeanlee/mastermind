let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];

let answer = [];
let guess = [];
let results =[];


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


// console.log(document.querySelector("#answer div:nth-child(2)"));

// // //changes individual pin color with pin number, color index and selector
function changePinColor(pinNum, colorInd, id) {
    let pin = document.querySelector(`${id} div:nth-child(${pinNum})`);
    switch (answerChoices[colorInd]) {
        case "red":
            pin.style.backgroundColor = "#faadbb";
            break;
        case "orange":
            pin.style.backgroundColor = "#ffc59e";
            break;
        case "yellow":
            pin.style.backgroundColor = "#f6e9b3";
            break;
        case "blue":
            pin.style.backgroundColor = "#abdde6";
            break;
        case "green":
            pin.style.backgroundColor = "#b2ecad";
            break;
        case "purple":
            pin.style.backgroundColor = "#b4a1e2";
            break;
    }
    // pin.style.backgroundColor = answerChoices[colorInd];
    // console.log(pin);
}

// changePinColor(1, 1, "#answer");

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

let feedback = $(".feedback_container");
// feedback.text("YOU WIN A BAGEL");
// console.log(feedback);


// // // function to check for win
function checkWin() {
    if (answer.length == guess.length) {
        answer.forEach((el, i) => {
            if (el == guess[i]) {
                feedback.text("You win A BAHGAL");
            }
        })
    }
}

// console.log(checkWin());

console.log(answer);