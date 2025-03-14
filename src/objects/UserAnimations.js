const mk_walking_frames = (root_frame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: root_frame
            },
            {
                time: 100,
                frame: root_frame + 1
            },
            {
                time: 200,
                frame: root_frame + 2
            },
            {
                time: 300,
                frame: root_frame + 3
            },
        ]
    }
}

const mk_standing_frame = (root_frame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: root_frame
            }
        ]
    }
}

export const S_D = mk_standing_frame(0);
export const S_U = mk_standing_frame(7);
export const S_L = mk_standing_frame(11);
export const S_R = mk_standing_frame(15);

export const W_D = mk_walking_frames(0);
export const W_U = mk_walking_frames(4);
export const W_L = mk_walking_frames(8);
export const W_R = mk_walking_frames(12);
