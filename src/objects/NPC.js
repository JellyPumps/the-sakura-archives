import { Sprite } from "./Sprite";
import { resources } from "./Resource";
import { Vector2 } from "./Vector2";

export class NPC {
    constructor(id, position, dialogue) {
        this.id = id;
        this.position = position;
        this.dialogue = dialogue;
        this.sprite = new Sprite({
            resource: resources.images.npc,
            frame_size: new Vector2(16, 16)
        });
    }

    interact() {
        return this.dialogue;
    }
}