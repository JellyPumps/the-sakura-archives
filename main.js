import { ProgramLoop } from './src/ProgramLoop.js';
import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';
import { Vector2 } from './src/Vector2.js';
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

const update = () => {

}

const draw = () => {
    background_sprite.draw_image(ctx, 0, 0);

    user.draw_image(ctx, user_pos.x, user_pos.y);
}

// Program loop
const p_loop = new ProgramLoop(update, draw);
p_loop.start();