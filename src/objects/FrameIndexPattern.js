export class FrameIndexPattern {
    constructor(animation_config) {
        this.current_time = 0
        this.animation_config = animation_config;
        this.duration = animation_config.duration ?? 500;
    }

    get frame() {
        const { frames } = this.animation_config;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.current_time >= frames[i].time) {
                return frames[i].frame;
            }
        }
        throw "Time is before the first frame";
    }

    step(delta) {
        this.current_time += delta;
        if (this.current_time >= this.duration) {
            this.current_time = 0;
        }
    }
}