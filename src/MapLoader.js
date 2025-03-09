import { resources } from "./Resource";
import { Vector2 } from "./Vector2";

export class map_loader {
    constructor(map_file) {
        this.map_file = map_file;
        this.data = null;
        this.walls = new Set();
        this.npcs = new Set();
        this.tile_size = 16;
        this.user_start = new Vector2(0, 0);
    }

    async load() {
        const response = await fetch(this.map_file);
        this.data = await response.json();

        this.data.tiles.forEach(tile => ({
            position: new Vector2(tile.position[0], tile.position[1]),
            type: tile.type,
            sprite: resources.images[tile.type]
        }));
    }

    draw(ctx, tile_size) {
        this.data.tiles.forEach(tile => {
            tile.sprite.draw_image(ctx, tile.position.x * tile_size, tile.position.y * tile_size);
        });
    }
}