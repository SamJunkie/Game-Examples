import {
    Example
} from "../js/components/Example.js";
import {
    Timer
} from "../js/components/Timer.js";
import {
    Game
} from "../js/components/Game.js";
//CONST ELEMENTS

//=========== Menu display ================
const menuDisplay = document.querySelector('.menu-container');
const menuBtns = menuDisplay.querySelectorAll('.btn');
const nickname = document.querySelector('.nickname');

//=========== Game display ================
const timer = document.querySelector('.bar__timer');
const boxExample = document.querySelector('.example__item');
const pointsSpan = document.querySelector('.points__item');
const gameDisplay = document.querySelector('.game-container');
const gamebox = document.querySelector('.gamebox');
const btnsAnswer = gamebox.querySelectorAll(".box__btn");
const pointsbox = document.querySelector('.pointsbox');
const timebar = document.querySelector('.bar__timerbar');




(function () {
    let gameTime;
    menuBtns.forEach((e) => {
        if (e.classList.contains('btn_select')) {
            gameTime = e.getAttribute(['data-time']);
        }
        e.addEventListener('click', () => {


            if (e.hasAttribute(['data-time'])) {
                gameTime = e.getAttribute(['data-time']);
                console.log(gameTime);
                menuBtns.forEach((btn) => btn.classList.remove('btn_select'));
                e.classList.add('btn_select');
            }

            if (e.classList.contains('start-btn')) {
                if (nickname.value != '') {
                    menuDisplay.classList.add('hide');

                    startGame();

                } else {
                    nickname.style.border = '2px red solid';
                    nickname.focus();
                }

            }

        });
    });

    console.log(btnsAnswer);

    async function startGame() {

        if (!pointsbox.classList.contains('hide')) {
            gamebox.classList.remove('hide');
            pointsbox.classList.add('hide');
        }
        gameDisplay.classList.remove('hide');

        let timerWidth = parseInt(getComputedStyle(timebar).width);

        const newGame = new Game({
            timeGame: gameTime
        });
        const example = newGame.startGame(Example, Timer);
        setNumbersOfTimebarForAnimate();
        newGame.renderSolutions(btnsAnswer, example[0].initExample().arraySolutions);
        newGame.renderExample(boxExample, example[0].example);



        const btns = Array.from(btnsAnswer);
        for (let btn of btns) {

            btn.addEventListener('click', (e) => {
                console.log(btns.indexOf(e.target));
                console.log('POINT:', newGame.checkSolutions(btns.indexOf(e.target), example[0]));
                newExample();
            });
        }



        function newExample() {
            let difficult = 2;

            if (newGame._points >= 5 && newGame._points < 9) {
               difficult = 3;
            } else if (newGame._points >= 9 && newGame._points < 13) {
                difficult = 4;
            } else if (newGame._points >= 13) {
               difficult = 5;
            }

            example[0] = new Example(difficult);
            example[0].initExample();
            newGame.renderSolutions(btnsAnswer, example[0].arraySolutions);
            newGame.renderExample(boxExample, example[0].example);
            newGame.countingNumberExamples();
        }



        let end = await example[1].startAndTimerOperations();
        if (end) {
            gameOver();
        }

        function setNumbersOfTimebarForAnimate() {
            
            const piece = timerWidth / (example[1]._sec) / 60;
            const countOfPieces = 60 * piece * example[1]._allTime;
                  
            requestAnimationFrame(animateTimerBar);

            function animateTimerBar() {
                let lastCountOfPieces = countOfPieces - (example[1]._allTime - example[1]._sec) * piece * 60;
                /* console.log(example[1]._allTime); */
                if (Math.floor(parseInt(timebar.style.width)) < 1) {
                    timebar.classList.remove('bar__timerbar_low-time');
                    return;
                }

                if (lastCountOfPieces < timerWidth) { // если анимация была остановлена, присвоим нужную длину для анимированного таймера
                    timerWidth = lastCountOfPieces;
                } else {
                    timerWidth -= piece;
                }

                if (example[1]._sec == 3) {
                    timebar.classList.add('bar__timerbar_low-time');
                }

                timebar.style.width = `${timerWidth}px`;

                requestAnimationFrame(animateTimerBar);
            }
        }


        function gameOver() {
            /* saveResult(); */
            gamebox.classList.add('hide');
            pointsbox.classList.remove('hide');
            outputPoints();
            newGame.endGame();
            clearGameNumbers();
            setTimeout(startGame, 4000);
        }



        function outputPoints() {
            pointsSpan.textContent = `${newGame._points} / ${newGame._countExamples}`;
        }

        function clearGameNumbers() {
            timebar.style = '';
            timebar.classList.remove('bar__timerbar_low-time');
        }
    }

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})();