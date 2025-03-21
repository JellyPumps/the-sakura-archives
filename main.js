import { ProgramLoop } from './src/objects/ProgramLoop.js';
import { Vector2 } from './src/objects/Vector2.js';
import { Input } from './src/objects/Input.js';
import './style.css'
import { grid_cells } from './src/tools/Grid.js';
import { MapLoader } from './src/objects/MapLoader.js';
import { GameObject } from './src/GameObject.js';
import { User } from './src/objects/User.js';

const canvas = document.querySelector("#main-canvas");
const ctx = canvas.getContext("2d");

const main_scene = new GameObject({
    position: new Vector2(0, 0)
})
// Map
const mpl = new MapLoader("./map.json", "./dialogues.json");
await mpl.load();

const user = new User(grid_cells(mpl.user_start.x), grid_cells(mpl.user_start.y));
main_scene.add_child(user);

main_scene.input = new Input();
main_scene.mpl = mpl;

const update = (delta) => {
    main_scene.step_entry(delta, main_scene);
}

const draw = () => {
    mpl.draw(ctx);
    main_scene.draw(ctx, 0, 0);
    
}

// Program loop
const p_loop = new ProgramLoop(update, draw);
p_loop.start();