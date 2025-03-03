export class Sprite {
    constructor({
        resource, // image
        frame_size, // size of crop of image
        h_frames, // horizontal frame position
        v_frames, // vertical frame position
        frame, // frame itself
        scale, // scale of the image
        position,
    }) {
        this.resource = resource;
        this.frame_size = frame_size;
        this.h_frames = h_frames ?? 1;
        this.v_frames = v_frames ?? 1;
        this.frame = frame ?? 0;
        this.frame_map = new Map();
        this.scale = scale ?? 1;
        this.position = position;
        this.build_frame_map();
    }

    build_frame_map() {
        let frame_count = 0;

        for (let v = 0; v < this.v_frames; v++) {
            for (let h = 0; h < this.h_frames; h++) {
                this.frame_map.set(
                    frame_count,
                    {x: 0, y: 0}
                )
                frame_count++;
            }
        }
    } 
}