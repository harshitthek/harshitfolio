import { describe, expect, it } from 'vitest';

const SPEED_MAP = {
  normal: 68,
  fast: 44,
  insane: 26
};

const calculateWrapPosition = (head, dir, cols, rows) => {
  let nextX = head.x + dir.x;
  let nextY = head.y + dir.y;

  if (nextX < 0) nextX = cols - 1;
  else if (nextX >= cols) nextX = 0;

  if (nextY < 0) nextY = rows - 1;
  else if (nextY >= rows) nextY = 0;

  return { x: nextX, y: nextY };
};

const isWallCollision = (head, dir, cols, rows) => {
  const nextX = head.x + dir.x;
  const nextY = head.y + dir.y;
  return nextX < 0 || nextX >= cols || nextY < 0 || nextY >= rows;
};

const isSelfCollision = (nextPos, snakeBody) => {
  return snakeBody.some((seg) => seg.x === nextPos.x && seg.y === nextPos.y);
};

describe('Arcade Snake 60FPS Game Physics Engine', () => {
  it('should map speed presets to correct millisecond intervals', () => {
    expect(SPEED_MAP.normal).toBe(68);
    expect(SPEED_MAP.fast).toBe(44);
    expect(SPEED_MAP.insane).toBe(26);
  });

  it('should wrap correctly across arena borders in WRAP mode', () => {
    const cols = 28;
    const rows = 18;

    // Moving left past 0 wraps to cols - 1 (27)
    const wrappedLeft = calculateWrapPosition({ x: 0, y: 5 }, { x: -1, y: 0 }, cols, rows);
    expect(wrappedLeft.x).toBe(27);
    expect(wrappedLeft.y).toBe(5);

    // Moving right past cols - 1 wraps to 0
    const wrappedRight = calculateWrapPosition({ x: 27, y: 5 }, { x: 1, y: 0 }, cols, rows);
    expect(wrappedRight.x).toBe(0);
    expect(wrappedRight.y).toBe(5);

    // Moving up past 0 wraps to rows - 1 (17)
    const wrappedUp = calculateWrapPosition({ x: 10, y: 0 }, { x: 0, y: -1 }, cols, rows);
    expect(wrappedUp.x).toBe(10);
    expect(wrappedUp.y).toBe(17);
  });

  it('should detect wall collisions in lethal WALLS mode', () => {
    const cols = 28;
    const rows = 18;

    expect(isWallCollision({ x: 0, y: 5 }, { x: -1, y: 0 }, cols, rows)).toBe(true);
    expect(isWallCollision({ x: 27, y: 5 }, { x: 1, y: 0 }, cols, rows)).toBe(true);
    expect(isWallCollision({ x: 5, y: 0 }, { x: 0, y: -1 }, cols, rows)).toBe(true);
    expect(isWallCollision({ x: 5, y: 17 }, { x: 0, y: 1 }, cols, rows)).toBe(true);
    expect(isWallCollision({ x: 5, y: 5 }, { x: 1, y: 0 }, cols, rows)).toBe(false);
  });

  it('should detect self-collision with snake body segments', () => {
    const snakeBody = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 5, y: 6 }
    ];
    expect(isSelfCollision({ x: 5, y: 6 }, snakeBody)).toBe(true);
    expect(isSelfCollision({ x: 6, y: 5 }, snakeBody)).toBe(false);
  });
});
