import { GameObject } from "../GameObject";
import { FrameIndexPattern } from "./FrameIndexPattern";
import { UP, DOWN, LEFT, RIGHT } from "./Input";
import { Vector2 } from "./Vector2";
import { Sprite } from "./Sprite";
import { resources } from "./Resource";
import { Animations } from "./Animations";
import { WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP, 
    STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP } from "./UserAnimations";
import { move_towards } from "../tools/MoveTowards";
import { handle_interaction } from "../tools/NPCTools";
import { is_space_free } from "../tools/Grid";
import { events } from "../Events";

export class User extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        })
        this.body = new Sprite({
            resource: resources.images.user,
            frame_size: new Vector2(16, 16),
            h_frames: 4,
            v_frames: 8,
            frame: 0,
            position: new Vector2(0, 0),
            animations: new Animations({
                walk_down: new FrameIndexPattern(WALK_DOWN),
                walk_up: new FrameIndexPattern(WALK_UP),
                walk_left: new FrameIndexPattern(WALK_LEFT),
                walk_right: new FrameIndexPattern(WALK_RIGHT),
                stand_down: new FrameIndexPattern(STAND_DOWN),
                stand_up: new FrameIndexPattern(STAND_UP),
                stand_left: new FrameIndexPattern(STAND_LEFT),
                stand_right: new FrameIndexPattern(STAND_RIGHT),
            })
        })
        this.add_child(this.body);

        this.facing_direction = DOWN;
        this.destination_position = this.position.duplicate();
        this.MOVE_SPEED = 1;
        this.GRID_SIZE = 16;
        
    }

    step(delta, root) {
        const distance = move_towards(this, this.destination_position, this.MOVE_SPEED)
        const has_arrived = distance <= this.MOVE_SPEED;

        if (has_arrived) { this.try_move(root) }

        const {mpl} = root;
        const {input} = root;

        handle_interaction(this, mpl.npcs, input);
        
        this.try_emit_position()
    }

    try_emit_position() {
        if (this.last_x === this.position.x && this.last_y === this.position.y) {return;}

        this.last_x = this.position.x;
        this.last_y = this.position.y;
        events.emit("USER_POSITION", this.position);
    }

    try_move(root) {
        const {input} = root;
        const {mpl} = root;

        if (!input.direction) {
            if (this.facing_direction === LEFT) {this.body.animations.play("stand_left")}
            if (this.facing_direction === RIGHT) {this.body.animations.play("stand_right")}
            if (this.facing_direction === UP) {this.body.animations.play("stand_up")}
            if (this.facing_direction === DOWN) {this.body.animations.play("stand_down")}
            return;
        }
    
        const direction_map = {
            [UP]: { x: 0, y: -this.GRID_SIZE, animation: "walk_up"},
            [DOWN]: { x: 0, y: this.GRID_SIZE, animation: "walk_down"},
            [LEFT]: { x: -this.GRID_SIZE, y: 0, animation: "walk_left"},
            [RIGHT]: { x: this.GRID_SIZE, y: 0, animation: "walk_right"},
            [null]: { x: 0, y: 0, animation: ""}
        }
    
        const { x, y, animation} = direction_map[input.direction];
        let n_x = this.destination_position.x + x;
        let n_y = this.destination_position.y + y;

        this.facing_direction = input.direction ?? this.facing_direction;
        this.body.animations.play(animation);

        if (is_space_free(mpl.walls, n_x, n_y)) {
            this.destination_position.x = n_x;
            this.destination_position.y = n_y;
        }
    
    }
}