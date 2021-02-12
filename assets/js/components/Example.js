/**
 * Класс примера
 * 
 * @difficulty {number}         Число операндов 
 * 
 */

export class Example {

    static countExamples = 0;

    constructor(difficulty = 2) {
        this.diff = difficulty;
        this.arraySolutions = [];
        this.example = '';
        this.result = null;
        Example.countExamples++;        
    }

    createExample() {
        const createRandomOperands = () => {
            const currentOperandsForThisExample = [];
    
            do {
                currentOperandsForThisExample.push(Math.floor(Math.random() * 9) + 1);
            } while (currentOperandsForThisExample.length < this.diff);
            /* console.log('operands!!', currentOperandsForThisExample); */
            return currentOperandsForThisExample;
        };
    
        const createRandomOperators = () => {
            let num = 3;
            const operators = ["+", "-", '*'];
            const currentOperatorsForThisExample = [null];
    
            do {
               let currentOperator = operators[Math.floor(Math.random() * num)];
                   if (currentOperator == '*') {
                       num -= 1;
                   }
                currentOperatorsForThisExample.push(currentOperator);

            } while (currentOperatorsForThisExample.length < this.diff);
    
            return currentOperatorsForThisExample;
        };


        let i = 0;
        const operands = createRandomOperands(),
              operators = createRandomOperators();

        do {
            (operators.length <= i + 1) ? 
                this.example += `${operands[i]}`: 
                this.example += `${operands[i]}${operators[i + 1]}`;
                i++;
        } while(i < this.diff);

        const createReversePolandNotation = () => {
            let output = '',
                i = 0,
                stack = [],
                operators = {
                    '+': 1,
                    '-': 1,
                    '*': 2
                };

            while (i < this.example.length) {
                if (this.example[i] in operators){
                    output += ' ';
                    if(!stack.length) {
                        stack.push(this.example[i]);
                        
                    } else {
                        for(let j = stack.length - 1; j >= 0; j--) {
                            if(operators[stack[j]] >= operators[this.example[i]]) {

                               output += (output[output.length - 1] in operators) ?
                                    ` ${stack.splice(stack.indexOf(j), 1)}` :
                                    stack.splice(stack.indexOf(j), 1);

                                /* if(output[output.length - 1] in operators) {
                                    output += ` ${stack.splice(stack.indexOf(j), 1)}`;
                                } else {
                                    output += stack.splice(stack.indexOf(j), 1);
                                } */
                                
                            }
                        }
                        stack.push(this.example[i]);
                    }
                    
                } else {

                    output += (output[output.length - 1] in operators) ?
                        ` ${this.example[i]}` :
                        this.example[i];

                    /* if(output[output.length - 1] in operators) {
                        output += ` ${this.example[i]}`;
                    } else {
                        output += this.example[i];
                    } */
                }
                i++;

                if(i == this.example.length) {
                    if(stack.length) {
                        for(let j = stack.length - 1; j >= 0; j--){
                            output += ` ${stack.pop()}`;
                        }
                    }
                }
            }
            /* console.log(output); */
            return output;
        };

        const solutionExample = (expr) => {

            const operators = {
                '+': (x, y) => x + y,
                '-': (x, y) => x - y,
                '*': (x, y) => x * y
            };

                let stack = [];
                
                expr.split(' ').forEach((token) => {
                    if (token in operators) {
                        let [y, x] = [stack.pop(), stack.pop()];
                        stack.push(operators[token](x, y));
                    } else {
                        stack.push(parseInt(token));
                    }
                });
            
                this.result = stack.pop();
            };

            const expr = createReversePolandNotation();
            solutionExample(expr);
    }

    createShuffleArraySolutions() {
        /**
         * Избавляемся от повторений ответов в массиве, используя Set
        */
       const createRandomSolve = () => {
            const randomNumber = new Set();
            randomNumber.add(this.result);

            do {
                randomNumber.add(this.result + (Math.floor(Math.random() * 5) - (Math.floor(Math.random() * 10) - 3)));
            } while(randomNumber.size < 4);
            
            return randomNumber;
        };

        this.arraySolutions = [...createRandomSolve()];
        
        // Используем тасовку Фишера-Йетса для расстановки ответов в массиве

        for (let i = this.arraySolutions.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.arraySolutions[i], this.arraySolutions[j]] = [this.arraySolutions[j], this.arraySolutions[i]];
        }
        console.log(this.arraySolutions);
    }

    checkCorrectSolution(solution) {
        return solution == this.result;
    }

    resetCount() {
        Example.countExamples = 0;
        console.log('COUNT:', Example.countExamples);
    }

    initExample() {
        this.createExample();
        this.createShuffleArraySolutions();
        return this;
    }
}