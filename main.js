import { ProgramLoop } from './src/objects/ProgramLoop.js';
import { resources } from './src/objects/Resource.js';
import { Sprite } from './src/objects/Sprite.js';
import { Vector2 } from './src/objects/Vector2.js';
import { Input, LEFT, RIGHT, UP, DOWN } from './src/objects/Input.js';
import './style.css'
import { grid_cells, is_space_free } from './src/tools/Grid.js';
import { move_towards } from './src/tools/MoveTowards.js';
import { map_loader } from './src/objects/MapLoader.js';
import { handle_interaction } from './src/tools/NPCTools.js';
import { animations } from './src/objects/Animations.js';
import { frame_idx_pattern } from './src/objects/FrameIndexPattern.js';
import { W_D, W_U, W_L, W_R } from './src/objects/UserAnimations.js';

const canvas = document.querySelector("#main-canvas");
const ctx = canvas.getContext("2d");

// Map
const mpl = new map_loader("./map.json", "./dialogues.json");
await mpl.load();

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
    position: new Vector2(grid_cells(mpl.user_start.x), grid_cells(mpl.user_start.y)),
    animations: new animations({
        walk_down: new frame_idx_pattern(W_D),
        walk_up: new frame_idx_pattern(W_U),
        walk_left: new frame_idx_pattern(W_L),
        walk_right: new frame_idx_pattern(W_R),
    })
})

const user_destination_position = user.position.duplicate();

const input = new Input();

const update = (delta) => {
    const distance = move_towards(user, user_destination_position, 1)
    const has_arrived = distance <= 1;

    if (has_arrived) {
        try_move()
    }

    handle_interaction(user, mpl.npcs, input);
    user.step(delta);
    
}

const try_move = () => {
    if (!input.direction) {
        return;
    }

    let n_x = user_destination_position.x;
    let n_y = user_destination_position.y;
    const grid_size = 16;

    switch (input.direction) {
        case UP:
            n_y -= grid_size;
            user.frame = 4;
            break;
        case DOWN:
            n_y += grid_size;
            user.frame = 1;
            break;
        case LEFT:
            n_x -= grid_size;
            user.frame = 8;
            break;
        case RIGHT:
            n_x += grid_size;
            user.frame = 12;
            break;
        default:
            break;
    }

    if (is_space_free(mpl.walls, n_x, n_y)) {
        user_destination_position.x = n_x;
        user_destination_position.y = n_y;
    }

}

const draw = () => {
    background_sprite.draw_image(ctx, 0, 0);

    mpl.draw(ctx);

    user.draw_image(ctx, user.position.x, user.position.y);
}

// Program loop
const p_loop = new ProgramLoop(update, draw);
p_loop.start();