import { Vector2 } from "../objects/Vector2";

export const grid_cells = n => n * 16;

export const is_space_free = (walls, x, y) => {
    const pos = new Vector2(x / 16, y / 16);
    let is_wall = false;

    walls.forEach(wall => {
        if (wall.x === pos.x && wall.y === pos.y) {
            is_wall = true;
        }
    });

    return !is_wall;
}