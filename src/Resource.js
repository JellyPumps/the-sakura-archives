// Safety check, so that canvas doesn't cause issues.
class Resources {
    constructor() {
        // Everything that needs to be downloaded
        this.to_load = {
            background: "/sprites/background.png",
            user: "/sprites/user.png",
            wall: "/tiles/wall.png",
            npc: "/sprites/npc.png",
            floor: "/tiles/floor.png",
            exhibit: "/sprites/exhibit.png",
        };

        // Store all images
        this.images = {};

        // Load images
        Object.keys(this.to_load).forEach(key => {
            const img = new Image()
            img.src = this.to_load[key];
            this.images[key] = {
                image: img,
                is_loaded: false 
            }
            img.onload = () => {
                this.images[key].is_loaded = true;
            }
        })
    }
}

export const resources = new Resources();