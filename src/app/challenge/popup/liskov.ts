abstract class Calculator {
    public abstract sum(x: number, y: number): number;
}

class VolumeCalculator extends Calculator {
    sum(x: number, y: number): number {
        return x + y;
    }
}


class Outputer {
    constructor(
        private calc: Calculator
    ) {
    }

    getOutput() {
        return `hello world: ${this.calc.sum(1, 2)}`;
    }
}

const calc = new VolumeCalculator();

const outputer = new Outputer(calc);

outputer.getOutput();
