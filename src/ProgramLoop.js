export class ProgramLoop {
    constructor(update, render) {
        this.last_frame_time = 0;
        this.accumalted_time = 0; 
        this.time_step = 1000/60; // 1000 ms divided by 60. 60 FPS

        this.update = update;
        this.render = render;
    }
}