import { Vector2 } from "../Vector2";

let is_prompt_displayed = false;
let curr_prompt_type = null;

const DIALOGUE = "dialogue";
const INTERACT = "interact";

export function handle_interaction(user, npcs, input) {
    let is_near_npc = false;

    npcs.forEach(npc => {
        if (check_proximity(user.position, npc.position)) {
            is_near_npc = true;
            
            if (!is_prompt_displayed || curr_prompt_type !== INTERACT) {
                remove_prompt(curr_prompt_type);
                insert_prompt(INTERACT);
                is_prompt_displayed = true;
                curr_prompt_type = INTERACT;
            }

            if (input.is_interact_pressed()) {
                remove_prompt(INTERACT);
                const dialogue = npc.interact();
                insert_prompt(DIALOGUE);
                document.getElementById('textbox').innerText = dialogue;
                is_prompt_displayed = true;
                curr_prompt_type = DIALOGUE;
            }
        }
    });

    if (!is_near_npc && is_prompt_displayed) {
        remove_prompt(curr_prompt_type);
        is_prompt_displayed = false;
        curr_prompt_type = null;
    }
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

const dialogue_prompt = `
    <div id="dialogue-prompt" class="dialogue-box">
        <p id="textbox"></p>
        <button id="close-button">Close</button>
    </div>
`;

const interact_prompt = `
    <div id="interaction-prompt" class="interact-box">
        <p id="textbox">Press E to interact</p>
    </div>
`;

export function insert_prompt(prompt) {
    if (prompt === DIALOGUE) {
        if (!document.getElementById('dialogue-prompt')) {
            document.body.insertAdjacentHTML('beforeend', dialogue_prompt);
            document.getElementById('close-button').addEventListener('click', () => {
                remove_prompt(DIALOGUE);
                is_prompt_displayed = false;
                curr_prompt_type = null;
            });
        }
    } else if (prompt === INTERACT) {
        if (!document.getElementById('interaction-prompt')) {
            document.body.insertAdjacentHTML('beforeend', interact_prompt);
        }
    }
}

export function remove_prompt(prompt) {
    if (prompt === DIALOGUE) {
        const dialogueBox = document.getElementById('dialogue-prompt');
        if (dialogueBox) dialogueBox.remove();
    } else if (prompt === INTERACT) {
        const interactBox = document.getElementById('interaction-prompt');
        if (interactBox) interactBox.remove();
    }
}