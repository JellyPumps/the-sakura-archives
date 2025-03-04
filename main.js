import { ProgramLoop } from './src/ProgramLoop.js';
import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';
import { Vector2 } from './src/Vector2.js';
import { Input, LEFT, RIGHT, UP, DOWN } from './src/Input.js';
import './style.css'

const canvas = document.querySelector("#main-canvas");
const ctx = canvas.getContext("2d");

// Defining sprites
const background_sprite = new Sprite({
    resource: resources.images.background,
    frame_size: new Vector2(320, 180),
})

const user = new Sprite({
    resource: resources.images.user,
    frame_size: new Vector2(16, 16),
    h_frames: 4,
    v_frames: 8,
    frame: 0,
})

const user_pos = new Vector2(8 * 5, 8 * 5);
const input = new Input();

const update = () => {
    switch (input.direction) {
        case UP:
            user_pos.y -= 1;
            user.frame = 4;
            break;
        case DOWN:
            user_pos.y += 1;
            user.frame = 1;
            break;
        case LEFT:
            user_pos.x -= 1;
            user.frame = 8;
            break;
        case RIGHT:
            user_pos.x += 1;
            user.frame = 12;
            break;
        default:
            break;
    }
}

const draw = () => {
    background_sprite.draw_image(ctx, 0, 0);

    user.draw_image(ctx, user_pos.x, user_pos.y);
}

// Program loop
const p_loop = new ProgramLoop(update, draw);
p_loop.start();