import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./objects/Vector2";

export class Camera extends GameObject {
    constructor() {
        super({});

        events.on("USER_POSITION", this, user_position => {
            const person_half = 8;
            const canvas_width = 320;
            const canvas_height = 180;
            const half_width = -person_half + canvas_width / 2;
            const half_height = -person_half + canvas_height / 2;
    
            this.position = new Vector2(
                -user_position.x + half_width,
                -user_position.y + half_height,
            )    
        })
    }
}