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
        try {
            const response = await fetch(this.map_file);
            if (!response.ok) throw new Error("Failed to load map file");
            this.data = await response.json();

            this.data.tiles = this.data.tiles.map(tile => {
                const position = new Vector2(tile.position[0] + 1, tile.position[1] + 2);
                const type = tile.type;
                const sprite = resources.images[type];

                if (type === "wall") {
                    this.walls.add(position);
                } else if (type === "npc") {
                    this.npcs.add(position);
                } else if (type === "player_start") {
                    this.user_start = position;
                }

                return { position, type, sprite };
            });
        } catch (error) {
            console.error("Error loading map:", error);
        }
    }

    draw(ctx) {
        if (!this.data) return;

        this.data.tiles.forEach(tile => {
            const x = tile.position.x * this.tile_size;
            const y = tile.position.y * this.tile_size;

            if (tile.sprite && tile.sprite.is_loaded) {
                ctx.drawImage(tile.sprite.image, x, y, this.tile_size, this.tile_size);
            }
        });
    }
}