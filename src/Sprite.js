import { Vector2 } from "./Vector2";

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
        this.frame_size = frame_size ?? new Vector2(16,16);
        this.h_frames = h_frames ?? 1;
        this.v_frames = v_frames ?? 1;
        this.frame = frame ?? 0;
        this.frame_map = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0,0);
        this.build_frame_map();
    }

    build_frame_map() {
        let frame_count = 0;

        for (let v = 0; v < this.v_frames; v++) {
            for (let h = 0; h < this.h_frames; h++) {
                this.frame_map.set(
                    frame_count,
                    new Vector2(this.frame_size.x * h, this.frame_size.y * v)
                )
                frame_count++;
            }
        }
    } 
}