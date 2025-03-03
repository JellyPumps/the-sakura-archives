import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';
import './style.css'

const canvas = document.querySelector("#main-canvas");
const ctx = canvas.getContext("2d");

const draw = () => {
    const background = resources.images.background;

    // Draw the image
    if (background.is_loaded) {
        ctx.drawImage(background.image, 0, 0)
    }
}

const user = new Sprite({
    resource: resources.images.user,
    h_frames: 3,
    v_frames: 4,
    frame: 1
})

// Basic program loop
setInterval(() => {
    draw()
}, 300)