export class frame_idx_pattern {
    constructor(animation_config) {
        this.current_time = 0
        this.animation_config = animation_config;
        this.duration = this.animation_config.duration ?? 400;
    }

    get frame() {
        const {frames} = this.animation_config.frames;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.current_time >= frames[i].time) {
                return frames[i].index;
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