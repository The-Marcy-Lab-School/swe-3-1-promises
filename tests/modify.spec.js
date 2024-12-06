const path = require('path');
const ScoreCounter = require('score-tests');
const { return4RandomColors } = require('../src/modify');

const testSuiteName = 'Modify Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

describe(testSuiteName, () => {
  afterEach(() => {
    jest.clearAllMocks();
    // flushing promises, don't worry about it
    return new Promise(setImmediate);
  });

  it('return4RandomColors - should return an array of colors as a promise', async () => {
    await expect(return4RandomColors()).toBeInstanceOf(Promise);
    await expect(return4RandomColors()).resolves.toBeInstanceOf(Array);
    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('return4RandomColors - should return 4 random colors each time called', async () => {
    let firstColor1;
    let firstColor2;
    let firstColor3;
    let firstColor4;

    await return4RandomColors()
      .then((firstColors) => {
        expect(firstColors).toHaveLength(4);
        [firstColor1, firstColor2, firstColor3, firstColor4] = firstColors;

        // using regular expressions to see that each color is in the proper rgb format
        expect(firstColor1).toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);
        expect(firstColor2).toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);
        expect(firstColor3).toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);
        expect(firstColor4).toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);

        return return4RandomColors();
      })
      .then((secondColors) => {
        expect(secondColors).toHaveLength(4);
        // just making sure that you don't return the same colors every time
        const [color1, color2, color3, color4] = secondColors;
        expect(color1).not.toBe(firstColor1);
        expect(color2).not.toBe(firstColor2);
        expect(color3).not.toBe(firstColor3);
        expect(color4).not.toBe(firstColor4);
      })
      .catch((err) => {
        expect(err).toBeNull();
      });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
