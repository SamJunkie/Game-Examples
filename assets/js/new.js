(function(){
    
const btns = document.querySelectorAll(".box__btn");
const timer = document.querySelector('.bar__timer');
const boxExample = document.querySelector('.example__item');
const pointsSpan = document.querySelector('.points__item');
const gamebox = document.querySelector('.gamebox');
const pointsbox = document.querySelector('.pointsbox');
const timebar = document.querySelector('.bar__timerbar');

//let nameObj = 0;
let obj,
    points = 0,
    counterExamples = 0;

class Example {

    constructor(difficulty = 2) {
        //this.name = name;
        this.diff = difficulty;
        this.numbers = this.randomNumbers(this.diff);
        this.operators = this.randomOperators(this.diff);
        this.example = this.createExample(this.numbers, this.operators, this.diff);
        this.result = this.solver(this.operators, this.numbers);
        this.anySolve = this.randomSolve(this.result);
        this.arrSolve = this.createArrSolvers();
    }

    randomNumbers(diff) {
        const numbers = [];
        for (let i = 0; i < diff; i++) {
            numbers.push(Math.floor(Math.random() * 10) + 1);
        }
        return numbers;
    }

    randomOperators(diff) {
        const operators = ["+", "-"];
        const currOperators = [null];
        for (let i = 1; i < diff; i++) {
            currOperators[i] = operators[Math.floor(Math.random() * 2)];
        }
        return currOperators;
    }

    createExample(num, oper, diff) {
        let example = "";
        for (let i = 0; i < diff; i++) {
            (oper.length <= i + 1) ? example += `${num[i]}`: example += `${num[i]}${oper[i + 1]}`;
        }
        return example;
    }

    solver(oper, nums) {

        let res = nums.reduce((sum, current, index) => {

            if (index < 1) {
                sum += current;

            } else {

                switch (oper[index]) {
                    case "*":
                        sum *= current;
                        break;

                    case "+":
                        sum += current;
                        break;

                    case "-":
                        sum -= current;
                        break;

                    case ":":
                        sum /= current;
                        break;
                }
            }
            return sum;
        }, 0);
        return res;

    }

    randomSolve(number) {
        let random = [],
            currNum;

        while (random.length < 3) {
            let match;
            currNum = number + (Math.floor(Math.random() * 5) - (Math.floor(Math.random() * 10) - 5));
            (number == currNum) ? match = 1: match = 0;
            //currNum *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
            for (let i = 0; i < random.length; i++) {
                if (random[i] == currNum) {
                    match = 1;
                    break;
                }
            }
            if (!match) {
                random[random.length] = currNum;
            }
        }
        return random;
    }

    createArrSolvers() {
        let arrSolvers = [];
        arrSolvers = arrSolvers.concat(this.result, this.anySolve);
        for (let i = arrSolvers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arrSolvers[i], arrSolvers[j]] = [arrSolvers[j], arrSolvers[i]];
        }
        return arrSolvers;
    }

    fillElements() {
        document.querySelector('.example__item').textContent = this.example;
        btns.forEach((e, i) => {
            e.textContent = this.arrSolve[i];
        });
    }
}

function newExample() {
    obj = new Example(changeDifficult());
    obj.fillElements();
    counterExamples++;
}

function changeDifficult() {
    if (points >= 5 && points < 9) {
        return 3;
    } else if (points >= 9 && points < 13) {
        return 4;
    } else if (points >= 13) {
        return 5;
    } 
    return 2;
}



// TIMER

function timeRemaining(sec) {
    let
        h = Math.floor((sec * 1000) / (1000 * 60 * 60) % 24),
        m = Math.floor(((sec * 1000) / 1000 / 60) % 60),
        s = Math.floor((sec % 60));

    timer.textContent = /* getZero(h) + `:` + */ getZero(m) + `:` + getZero(s);

}

function setTimer(sec) {
    timeRemaining(sec);
    let timerWidth = +(getComputedStyle(timebar).width).replace('px', '');
    const piece = timerWidth / sec;
    const timer = setInterval(updateTime, 1000);

    function updateTime() {
        sec--;
        timeRemaining(sec);
        timerWidth -= piece;
        document.querySelector('.bar__timerbar').style.width = `${timerWidth}px`;

        if (sec <= 0) {
            document.querySelector('.bar__timerbar').style.width = `0px`;
            clearInterval(timer);
            gameOver();
        }

    }
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
    return num;
}



// END GAME

function countingPoints(solve) {
    
    if (solve) {
        points++;
    }
}

function outputPoints() {
    let str = 'примеров';
    if (points < 10 || points > 20) {
        switch (points % 10) {
            case 1:
                str = 'пример';
                break;
    
            case 2:
            case 3:
            case 4:
                str = 'примера';
                break;
            default:
                str = 'примеров';
                break;
        }
    }


    pointsSpan.textContent = `Вы решили правильно ${points} ${str} \n из ${counterExamples}`;
}

    /* if (points < 0) {
        points = 0;
    } */

    

function gameOver() {
    saveResult();
    gamebox.classList.add('hide');
    pointsbox.classList.remove('hide');
    outputPoints();
    points = 0;
    counterExamples = 0;
    setTimeout(start, 4000);
}

function saveResult() {
    if (points > +(localStorage.getItem('Best')) || !(localStorage.getItem('Best'))) {
        localStorage.setItem('Best', points);
    }
    
}

function checkCorrectSolve(e) {
    countingPoints(+(e.textContent) == obj.result);
}

function start() {
    if (!pointsbox.classList.contains('hide')) {
        pointsbox.classList.add('hide');
        gamebox.classList.remove('hide');
    }
    timebar.style = "";
        newExample();
        setTimer(60);
}

btns.forEach(e => {
    e.addEventListener('click', () => {
        checkCorrectSolve(e);
        newExample();

    });
});

start();
})()

