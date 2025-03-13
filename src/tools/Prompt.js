export const DIALOGUE = "dialogue";
export const INTERACT = "interact";

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
        document.body.insertAdjacentHTML('beforeend', dialogue_prompt);
        document.getElementById('close-button').addEventListener('click', () => {
            remove_prompt(DIALOGUE);
        });
    } else if (prompt === INTERACT) {
        document.body.insertAdjacentHTML('beforeend', interact_prompt);
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