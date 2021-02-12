export class Timer {

    constructor(sec) {
        this._allTime = sec;
        this._sec = sec;
        this.remainingTime = {};
    }

    setTimerSeconds(sec) {
        if (typeof sec == 'number' && sec >= 0) {
            this._sec = sec;
        } else {
            this._sec = 30;
        }
    }

    updateRemainingTime() {
        this.remainingTime.minutes = Math.floor(((this._sec * 1000) / 1000 / 60) % 60);
        this.remainingTime.seconds = Math.floor((this._sec % 60));

        /* this.remainingTime.minutes = setFirstZero(Math.floor(((this._sec * 1000) / 1000 / 60) % 60));
        this.remainingTime.seconds = setFirstZero(Math.floor((this._sec % 60))); */
        /* console.log(this.remainingTime); */

        /* function setFirstZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            }
            return num;
        } */
    }

    startAndTimerOperations() {
        return new Promise((res) => {
            let timer = setInterval(() => {

                if (this._sec == 0) {
                    clearInterval(timer);
                    res(true);
                }

                this.setTimerSeconds(this._sec - 1);
                this.updateRemainingTime();
            }, 1000);
        });

    }

}