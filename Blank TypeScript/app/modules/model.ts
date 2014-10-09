class Model {
    private counter: number = 42;

    get Text(): string {
        return this.counter + " taps left";
    }

    get Counter(): number {
        return this.counter;
    }

    action() {
        this.counter--;
    }
}

var model = new Model();
module.exports = model;