import { NPC } from "./NPC";
import { resources } from "./Resource";
import { Vector2 } from "./Vector2";

export class map_loader {
    constructor(map_file, npc_file) {
        this.map_file = map_file;
        this.npc_file = npc_file;
        this.data = null;
        this.walls = new Set();
        this.npcs = new Set();
        this.tile_size = 16;
        this.user_start = new Vector2(0, 0);
        this.npc_dialogue = {};
    }

    async load() {
        try {
            const m_response = await fetch(this.map_file);
            if (!m_response.ok) throw new Error("Failed to load map file");
            this.data = await m_response.json();

            const n_response = await fetch(this.npc_file);
            if (!n_response.ok) throw new Error("Failed to load npc file");
            const npc_dialogue = await n_response.json();

            this.data.tiles = this.data.tiles.map(tile => {
                const position = new Vector2(tile.position[0] + 1, tile.position[1] + 2);
                const type = tile.type;
                const sprite = resources.images[type];

                if (type === "wall" || type === "exhibit") {
                    this.walls.add(position);
                } else if (type === "npc") {
                    const npc_id = tile.id;
                    const dialogue = this.npc_dialogue[npc_id];
                    const npc = new NPC(npc_id, position, dialogue);
                    this.npcs.add(npc);
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