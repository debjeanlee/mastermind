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

    answer.forEach((el, i) => {
        changePinColor(i+1, el, "#answer")
    })
}

// console.log(document.querySelector("#answer div:nth-child(2)"));

// changes individual pin color with pin number, color index and selector
function changePinColor(pinNum, colorInd, id) {
    let pin = document.querySelector(`${id} div:nth-child(${pinNum})`);
    pin.style.backgroundColor = answerChoices[colorInd];
    console.log(pin);
}

// changePinColor(1, 1, "#answer");

setAnswer();

