export class Game {
    constructor(data) {
        this._points = 0;
        this._countExamples = 1;
        this.gameTime = data.timeGame;
    }

    /* setTimer(gameTime, timerClass) {
        return new timerClass(gameTime);
    } */

    renderExample(exampleField, example) {
        exampleField.textContent = example;
    }

    renderSolutions(arrayBtns, arraySolutions) {
        arrayBtns = Array.from(arrayBtns);
        /* console.log(arrayBtns); */
        for (let btn in arrayBtns) {
            arrayBtns[btn].textContent = arraySolutions[btn];
        }
    }

    checkSolutions(index, object) {
        if(object.arraySolutions[index] == object.result) {
            this.countingPoints();
            return true;
        }
        return false;
    }

    countingPoints() {
       this._points++; 
    }

    changeDifficult(example) {
        example.diff++;
    }

    startGame(exampleClass, timerClass) {
        const newExample = () => {
            return [
                new exampleClass(),
                new timerClass(this.gameTime),
            ];
        };
        
        return newExample();
    }
    endGame() {
        this._countExamples = 1;
    }
    setPoints() {}
    
    countingNumberExamples() {
        this._countExamples ++;
    }

    saveResultGame() {}
}



