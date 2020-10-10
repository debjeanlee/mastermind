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
    pin.style.backgroundColor = answerChoices[colorInd];
    // console.log(pin);
}

// changePinColor(1, 1, "#answer");

setAnswer();

// // // function to get guess
$(".selector_pin").click(function() {
    let id = $(this).attr("id");
    if (guess.length < 4) {
        colorClicked(id);
        let pinNum = guess.length;
        let color = answerChoices.indexOf(guess[guess.length - 1]);
        changePinColor(pinNum, color, "#guess");
        // console.log(color);
    } else {
        console.log("too long nigga")
    }
});

// changePinColor(1,1,"#guess");

// // // function to add clicked color to guess arr
function colorClicked(id) {
    switch (id) {
        case "s_red":
            guess.push("red");
            break;
        case "s_blue":
            guess.push("blue");
            break;
        case "s_green":
            guess.push("green");
            break;
        case "s_yellow":
            guess.push("yellow");
            break;
        case "s_purple":
            guess.push("purple");
            break;
        case "s_orange":
            guess.push("orange");
            break;
    }
}

// let s = document.getElementById("s_orange").style.backgroundColor;
// console.log(s == "");

// console.log(colorClicked("s_red"));


// // // function to show guess results
// function guessResults(round, guess) {
    
// }
