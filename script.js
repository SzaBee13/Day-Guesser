const dateBetween = (start, end) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    
    const randomTime = parseInt(startTime + Math.random() * (endTime - startTime));
    return new Date(randomTime);
}

const dateText = document.getElementById("date");
const minInput = document.getElementById("min-year");
const maxInput = document.getElementById("max-year");

let min = "1000-01-01"
let max = "3000-01-01"
let miy = 1000
let may = 3000

let currentDate = dateBetween(
    new Date(max),
    new Date(min)
);
dateText.textContent = currentDate.toLocaleDateString();


let correct = 0;
let incorrect = 0;

let correctText = document.getElementById("correct");
let incorrectText = document.getElementById("incorrect");

const checkAnswer = (answer) => {
    if (answer == currentDate.getDay()) {
        correct += 1;
        correctText.textContent = correct;
    } else {
        incorrect += 1;
        incorrectText.textContent = incorrect;
    }
    local("set")

    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
    dateText.textContent = currentDate.toLocaleDateString();
    console.log(`${min}, ${max}, ${correct}, ${incorrect}`)
}

const local = (td) => {
    if (td == "load") {
        if (localStorage.getItem("correct")) {
            correct = parseInt(localStorage.getItem("correct"));
            correctText.innerHTML = correct;
        } else {
            correct = 0;
            localStorage.setItem("correct", correct)
            correctText.innerHTML = correct;
        }
        if (localStorage.getItem("incorrect")) {
            incorrect = parseInt(localStorage.getItem("incorrect"));
            incorrectText.innerHTML = incorrect;
        } else {
            incorrect = 0;
            localStorage.setItem("incorrect", incorrect)
            incorrectText.innerHTML = incorrect
        }
        if (localStorage.getItem("min")) {
            miy = parseInt(localStorage.getItem("min"));
            minInput.value = miy;
        } else {
            miy = 1000;
            localStorage.setItem("min", miy);
            minInput.value = miy;
        }
        if (localStorage.getItem("max")) {
            may = parseInt(localStorage.getItem("max"));
            maxInput.value = may;
        } else {
            may = 3000;
            localStorage.setItem("max", may);
            maxInput.value = may;
        }
    } else if (td == "clear"){
        localStorage.setItem("correct", 0);
        localStorage.setItem("incorrect", 0);
    } else if (td == "set") {
        localStorage.setItem("correct", correct);
        localStorage.setItem("incorrect", incorrect);
        localStorage.setItem("min", miy);
        localStorage.setItem("max", may);
    }
}

const nullAnswer = () => {
    correct = 0;
    correctText.innerHTML = correct;
    incorrect = 0;
    incorrectText.innerHTML = incorrect;
    local("clear");
}

const init = () => {
    local("load")
    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
}

const setYear = (n, ud=null) => {
    if (n == "min") {
        if (ud == "up") {
            miy += 1;
        } else if (ud == "down") {
            miy -= 1;
        }
        min = `${miy}-01-01`;
        minInput.value = miy;
        maxInput.setAttribute("min", miy)
    } else if (n == "max") {
        if (ud == "up") {
            may += 1;
        } else if (ud == "down") {
            may -= 1;
        }
        max = `${may}-01-01`;
        maxInput.value = may;
        minInput.setAttribute("max", may)
    }

    local("set")
    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
}

window.onload = init