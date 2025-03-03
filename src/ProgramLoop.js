export class ProgramLoop {
    constructor(update, render) {
        this.last_frame_time = 0;
        this.accumalted_time = 0; 
        this.time_step = 1000/60; // 1000 ms divided by 60. 60 FPS

        this.update = update;
        this.render = render;

        this.raf_id = null;
        this.is_running = false;
    }

    main_loop = (timestamp) => {
        if (!this.is_running) return;

        let delta_time = timestamp - this.last_frame_time;
        this.last_frame_time = timestamp;

        this.accumalted_time += delta_time;

        while (this.accumalted_time >= this.time_step) {
            this.update(this.time_step);
            this.accumalted_time -= this.time_step;
        }

        this.render();
        this.raf_id = requestAnimationFrame(this.main_loop);
    }
}