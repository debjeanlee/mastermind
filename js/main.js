let answerChoices = ["red", "blue", "green", "yellow", "purple", "orange"];
let answer = [];
let guess = [];


// sets random answer chosen by computer
function setAnswer() {
    for (let x = 0; x < 4; x++) {
        let colorIndex = Math.floor(Math.random() * 6);
        answer.push(colorIndex);
        // console.log(answer);
    }

    // answer.forEach(el => {

    // })
}

// console.log(document.querySelector("#answer div:nth-child(2)"));

function changePinColour(pinNum, colorInd, id) {
    let pin = document.querySelector(`${id} div:nth-child(${pinNum})`);
    pin.style.backgroundColor = answerChoices[colorInd];
    console.log(pin);
}

// changePinColour(1, 1, "#answer");

setAnswer();

