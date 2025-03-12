import { Vector2 } from "../Vector2";

export function handle_interaction(user, npcs, input) {
    npcs.forEach(npc => {
        if (check_proximity(user.position, npc.position)) {
            // TODO add gui interaction
            console.log("Press E to interact");

            if (input.is_interact_pressed()) {
                const dialogue = npc.interact();
                console.log(dialogue);
            }
        }
    });
}

function check_proximity(user_pos, npc_pos, range=1) {
    const n_user_pos = new Vector2(user_pos.x / 16, user_pos.y / 16);
    const distance = distance_to(n_user_pos, npc_pos);
    return distance <= range;
}

function distance_to(from, to) {
    const distance_2_x = to.x - from.x;
    const distance_2_y = to.y - from.y;
    return Math.sqrt(distance_2_x**2 + distance_2_y**2);
}
