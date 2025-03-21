export class Animations {
    constructor(patterns) {
        this.patterns = patterns;
        this.active_key = Object.keys(this.patterns)[0];
    }

    get frame() {
        return this.patterns[this.active_key].frame;
    }

    play(key, start_at_time = 0) {
        if (this.active_key === key) { return; }

        this.active_key = key;
        this.patterns[this.active_key].current_time = start_at_time;
    } 

    step(delta) {
        this.patterns[this.active_key].step(delta);
    }
}