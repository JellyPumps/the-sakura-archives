import { Vector2 } from "./Vector2";
import { Animations } from "./Animations";
import { GameObject } from "../GameObject";

export class Sprite extends GameObject{
    constructor({
        resource, // image
        frame_size, // size of crop of image
        h_frames, // horizontal frame position
        v_frames, // vertical frame position
        frame, // frame itself
        scale, // scale of the image
        position,
        animations
    }) {
        super({});
        this.resource = resource;
        this.frame_size = frame_size ?? new Vector2(16,16);
        this.h_frames = h_frames ?? 1;
        this.v_frames = v_frames ?? 1;
        this.frame = frame ?? 0;
        this.frame_map = new Map();
        this.scale = scale ?? new Vector2(1, 1);
        this.position = position ?? new Vector2(0,0);
        this.animations = animations ?? null;
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

    step(delta) {
        if (!this.animation) return;

        this.animations.step(delta);
        this.frame = this.animations.frame;
    }

    draw_image(ctx, x, y) {
        // Check if sprite is loaded
        if (!this.resource.is_loaded) return;

        // Find frame
        const frame = this.frame_map.get(this.frame);
        const frame_coord_x = frame ? frame.x : 0;
        const frame_coord_y = frame ? frame.y : 0;

        const frame_size_x = this.frame_size.x;
        const frame_size_y = this.frame_size.y;

        // Finally, draw
        ctx.drawImage(
            this.resource.image,
            frame_coord_x, frame_coord_y,
            frame_size_x, frame_size_y,
            x, y,
            frame_size_x * this.scale.x, frame_size_y * this.scale.y,
        )
    }
}