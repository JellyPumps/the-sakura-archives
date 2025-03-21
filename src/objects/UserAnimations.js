const mk_walking_frames = (root_frame = 0) => {
    return {
        duration: 400,
        frames: [
            { time: 0, frame: root_frame },
            { time: 100, frame: root_frame + 1 },
            { time: 200, frame: root_frame + 2 },
            { time: 300, frame: root_frame + 3 },
        ]
    }
}

const mk_standing_frame = (root_frame = 0) => {
    return {
        duration: 400,
        frames: [{ time: 0, frame: root_frame }]
    }
}

export const STAND_DOWN = mk_standing_frame(0);
export const STAND_UP = mk_standing_frame(7);
export const STAND_LEFT = mk_standing_frame(11);
export const STAND_RIGHT = mk_standing_frame(15);

export const WALK_DOWN = mk_walking_frames(0);
export const WALK_UP = mk_walking_frames(4);
export const WALK_LEFT = mk_walking_frames(8);
export const WALK_RIGHT = mk_walking_frames(12);
