const dateBetween = (start, end) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    
    const randomTime = parseInt(startTime + Math.random() * (endTime - startTime));
    return new Date(randomTime);
}

const dateText = document.getElementById("date");

let min = "1000-01-01"
let max = "3000-01-01"
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

    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
    dateText.textContent = currentDate.toLocaleDateString();
}

const local = (td, value=null) => {
    if (td == "load") {
        correct = parseInt(localStorage.getItem("correct"))
        incorrect = parseInt(localStorage.getItem("incorrect"))
    } else if (td == "clear"){
        localStorage.setItem("correct", 0)
        localStorage.setItem("incorrect", 0)
    } else if (td == "set") {
        localStorage.setItem("correct", value)
        localStorage.setItem("incorrect", value)
    }
}

const nullAnswer = () => {
    correct = 0
    incorrect = 0
    local("clear")
}

const init = () => {
    local("load")
    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
}

const setYear = (n) => {
    if (n == "min") {
        min = parseInt(document.getElementById("min-year").value)
    } else if (n == "max") {
        max = parseInt(document.getElementById("max-year").value)
    }

    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
}

window.onload = init