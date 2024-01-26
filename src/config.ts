export const START_TICK_RATE = 300;
export const BOARD_WIDTH = 50;
export const BOARD_HEIGHT = 50;

export const TICK_DECAY = (tick: number) => Math.max(tick - 50, tick * 0.8);
