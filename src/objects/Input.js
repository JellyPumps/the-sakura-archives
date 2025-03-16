export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"

export class Input {
    constructor() {
        this.held_directions = [];
        this.interact_pressed = false;

        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowUp":
                case "KeyW":
                    this.on_arrow_pressed(UP);
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.on_arrow_pressed(DOWN);
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.on_arrow_pressed(LEFT);
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.on_arrow_pressed(RIGHT);
                    break;
                case "KeyE":
                    if (!this.interact_pressed) {
                        this.interact_pressed = true;
                        this.schedule_reset();
                    }
                    break;
                default:
                    break;
            }
        })

        document.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowUp":
                case "KeyW":
                    this.on_arrow_released(UP);
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.on_arrow_released(DOWN);
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.on_arrow_released(LEFT);
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.on_arrow_released(RIGHT);
                    break;
                case "KeyE":
                    this.interact_pressed = false;
                    break;
                default:
                    break;
            }
        })
    }

    get direction() {
        return this.held_directions[0];
    }

    on_arrow_pressed(direction) {
        if (this.held_directions.indexOf(direction) === -1) {
            this.held_directions.unshift(direction);
        }
    }

    on_arrow_released(direction) {
        const idx = this.held_directions.indexOf(direction);
        if (idx === -1) return;

        this.held_directions.splice(idx, 1);
    }

    is_interact_pressed() {
        return this.interact_pressed;
    }

    schedule_reset() {
        requestAnimationFrame(() => {
            this.interact_pressed = false;
        });
    }
}