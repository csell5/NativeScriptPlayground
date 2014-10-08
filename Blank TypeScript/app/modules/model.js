var Model = (function () {
    function Model() {
        this.counter = 42;
    }
    Object.defineProperty(Model.prototype, "Text", {
        get: function () {
            return this.counter + " taps left";
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Model.prototype, "Counter", {
        get: function () {
            return this.counter;
        },
        enumerable: true,
        configurable: true
    });

    Model.prototype.action = function () {
        this.counter--;
    };
    return Model;
})();

var model = new Model();
module.exports = model;
//# sourceMappingURL=model.js.map
