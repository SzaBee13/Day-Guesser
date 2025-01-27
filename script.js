const dateBetween = (start, end) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    
    const randomTime = parseInt(startTime + Math.random() * (endTime - startTime));
    return new Date(randomTime);
}

const dateText = document.getElementById("date");
const minInput = document.getElementById("min-year");
const maxInput = document.getElementById("max-year");
const correctText = document.getElementById("correct");
const incorrectText = document.getElementById("incorrect");

let min = "1000-01-01"
let max = "3000-01-01"
let miy = 1000
let may = 3000
let lang = "en"

let currentDate = dateBetween(
    new Date(max),
    new Date(min)
);
dateText.textContent = currentDate.toLocaleDateString();


let correct = 0;
let incorrect = 0;

const checkAnswer = (answer) => {
    const correctText = document.getElementById("correct");
    const incorrectText = document.getElementById("incorrect");
    if (answer == currentDate.getDay()) {
        correct += 1;
        correctText.innerHTML = correct;
    } else {
        incorrect += 1;
        incorrectText.innerHTML = incorrect;
    }
    local("set");
    document.getElementById("be-date").innerHTML = currentDate.toLocaleDateString();
    if (lang == "hu") {
        if (currentDate.getDay() == 1) {
            document.getElementById("be-day").innerHTML = "Hétfő"
        } else if (currentDate.getDay() == 2) {
            document.getElementById("be-day").innerHTML = "Kedd"
        } else if (currentDate.getDay() == 3) {
            document.getElementById("be-day").innerHTML = "Szerda"
        } else if (currentDate.getDay() == 4) {
            document.getElementById("be-day").innerHTML = "Csütörtök"
        } else if (currentDate.getDay() == 5) {
            document.getElementById("be-day").innerHTML = "Péntek"
        } else if (currentDate.getDay() == 6) {
            document.getElementById("be-day").innerHTML = "Szombat"
        } else if (currentDate.getDay() == 0) {
            document.getElementById("be-day").innerHTML = "Vasárnap"
        }
    } else if (lang == "en") {
        if (currentDate.getDay() == 1) {
            document.getElementById("be-day").innerHTML = "Monday"
        } else if (currentDate.getDay() == 2) {
            document.getElementById("be-day").innerHTML = "Tuesday"
        } else if (currentDate.getDay() == 3) {
            document.getElementById("be-day").innerHTML = "Wednesday"
        } else if (currentDate.getDay() == 4) {
            document.getElementById("be-day").innerHTML = "Thursday"
        } else if (currentDate.getDay() == 5) {
            document.getElementById("be-day").innerHTML = "Friday"
        } else if (currentDate.getDay() == 6) {
            document.getElementById("be-day").innerHTML = "Saturday"
        } else if (currentDate.getDay() == 0) {
            document.getElementById("be-day").innerHTML = "Sunday"
        }
    }

    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
    dateText.textContent = currentDate.toLocaleDateString();
}

const local = (td, w=null) => {
    const minInput = document.getElementById("min-year");
    const maxInput = document.getElementById("max-year");
    
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
            minInput.value = miy
            setYear('min')
        } else {
            miy = 1000;
            localStorage.setItem("min", miy);
            setYear("min")
        }
        if (localStorage.getItem("max")) {
            may = parseInt(localStorage.getItem("max"));
            maxInput.value = may
            setYear('max')
        } else {
            may = 3000;
            localStorage.setItem("max", may);
            setYear("max")
        }
        if (localStorage.getItem("lang")) {
            setLang(localStorage.getItem("lang"))
        } else {
            localStorage.setItem("lang", "en")
            setLang("en")
        }
    } else if (td == "clear"){
        localStorage.setItem("correct", 0);
        localStorage.setItem("incorrect", 0);
    } else if (td == "set") {
        localStorage.setItem("correct", correct);
        localStorage.setItem("incorrect", incorrect);
        if (w == "min") {
            localStorage.setItem("min", miy);
        } else if (w == "max") {
            localStorage.setItem("max", may);
        }
        localStorage.setItem("lang", lang)
    }
}

const nullAnswer = () => {
    correct = 0;
    document.getElementById("correct").innerHTML = 0;
    incorrect = 0;
    document.getElementById("incorrect").innerHTML = 0;
    local("clear");
}


const setYear = (n, ud=null) => {
    if (n == "min") {
        if (ud == "up") {
            miy += 1;
        } else if (ud == "down") {
            miy -= 1;
        } else {
            miy = parseInt(minInput.value)
        }
        min = `${miy}-01-01`;
        minInput.value = miy;
        maxInput.setAttribute("min", miy)
    } else if (n == "max") {
        if (ud == "up") {
            may += 1;
        } else if (ud == "down") {
            may -= 1;
        } else {
            may = parseInt(maxInput.value)
        }
        max = `${may}-01-01`;
        maxInput.value = may;
        minInput.setAttribute("max", may)
    }
    
    local("set", n)
    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
}

const setLang = (l) => {
    if (l == "hu") {
        document.getElementById("en").classList.remove("active")
        document.getElementById("hu").classList.add("active")

        document.getElementById("main-h1").innerHTML = "A hét melyik napjára esik a dátum?"
        document.getElementById("ci").innerHTML = `Helyes: <span id="correct">${correct}</span>, Helytelen: <span id="incorrect">${incorrect}</span> - <span class="blue" onclick="nullAnswer()">Nullázás</span>`
        document.getElementById("before").innerHTML = `Előző: <span id="be-date"></span>, <span id="be-day"></span>`

        document.getElementById("day1").innerHTML = "Hétfő"
        document.getElementById("day2").innerHTML = "Kedd"
        document.getElementById("day3").innerHTML = "Szerda"
        document.getElementById("day4").innerHTML = "Csütörtök"
        document.getElementById("day5").innerHTML = "Péntek"
        document.getElementById("day6").innerHTML = "Szombat"
        document.getElementById("day0").innerHTML = "Vasárnap"

        document.getElementById("open-year").innerHTML = "Kezdő Év"
        document.getElementById("close-year").innerHTML = "Záró Év"
    } else if (l == "en") {
        document.getElementById("hu").classList.remove("active")
        document.getElementById("en").classList.add("active")

        document.getElementById("main-h1").innerHTML = "What day of the week is the date?"
        document.getElementById("ci").innerHTML = `Correct: <span id="correct">${correct}</span>, Incorrect: <span id="incorrect">${incorrect}</span> - <span class="blue" onclick="nullAnswer()">Reset</span>`
        document.getElementById("before").innerHTML = `Previous: <span id="be-date"></span>, <span id="be-day"></span>`

        document.getElementById("day1").innerHTML = "Monday"
        document.getElementById("day2").innerHTML = "Tuesday"
        document.getElementById("day3").innerHTML = "Wednesday"
        document.getElementById("day4").innerHTML = "Thursday"
        document.getElementById("day5").innerHTML = "Friday"
        document.getElementById("day6").innerHTML = "Saturday"
        document.getElementById("day0").innerHTML = "Sunday"

        document.getElementById("open-year").innerHTML = "Start Year"
        document.getElementById("close-year").innerHTML = "End Year"
    }
    lang = l
    local("set")
}

const init = () => {
    local("load")
    currentDate = dateBetween(
        new Date(max),
        new Date(min)
    );
    dateText.textContent = currentDate.toLocaleDateString();
}

window.onload = init