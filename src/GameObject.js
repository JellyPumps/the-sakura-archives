import { Vector2 } from "./objects/Vector2";

export class GameObject {
  constructor({ position }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
  }

  step_entry(delta, root) {
    this.children.forEach((child) => child.step_entry(delta, root));
    this.step(delta, root);
  }

  // Called once every frame
  step(_delta) {
    //...
  }

  // Draw entry
  draw(ctx, x, y) {
    const draw_pos_x = x + this.position.x;
    const draw_pos_y = y + this.position.y;

    this.draw_image(ctx, draw_pos_x, draw_pos_y);

    this.children.forEach((child) => child.draw(ctx, draw_pos_x, draw_pos_y));
  }

  draw_image(ctx, draw_pos_x, draw_pos_y) {
    //...
  }

  add_child(gobj) {
    this.children.push(gobj);
  }

  kill_child(gobj) {
    this.children = this.children.filter(g => {
        return gobj !== g;
    })
  }
}
