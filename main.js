import { ProgramLoop } from './src/objects/ProgramLoop.js';
import { Vector2 } from './src/objects/Vector2.js';
import { Input } from './src/objects/Input.js';
import './style.css'
import { grid_cells } from './src/tools/Grid.js';
import { MapLoader } from './src/objects/MapLoader.js';
import { GameObject } from './src/GameObject.js';
import { User } from './src/objects/User.js';
import { events } from './src/Events.js';
import { Camera } from './src/Camera.js';

const canvas = document.querySelector("#main-canvas");
const ctx = canvas.getContext("2d");

const main_scene = new GameObject({
    position: new Vector2(0, 0)
})
// Map
const mpl = new MapLoader("./map.json", "./dialogues.json");
await mpl.load();

const camera = new Camera()
main_scene.add_child(camera);

const user = new User(grid_cells(mpl.user_start.x), grid_cells(mpl.user_start.y));
main_scene.add_child(user);

main_scene.input = new Input();
main_scene.mpl = mpl;

const update = (delta) => {
    main_scene.step_entry(delta, main_scene);
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(camera.position.x, camera.position.y);

    mpl.draw(ctx);
    main_scene.draw(ctx, 0, 0);

    ctx.restore();
    
}

// Program loop
const p_loop = new ProgramLoop(update, draw);
p_loop.start();