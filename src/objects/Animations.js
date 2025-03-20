export class animations {
    constructor(patterns) {
        this.patterns = patterns;
        this.active_key = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.active_key].frame;
    }

    step(delta) {
        this.patterns[this.active_key].step(delta);
    }
}