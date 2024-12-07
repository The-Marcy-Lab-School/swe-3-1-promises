const path = require('path');
const ScoreCounter = require('score-tests');
const {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
} = require('../src/from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const log = jest.spyOn(console, 'log').mockImplementation(() => { });
const logError = jest.spyOn(console, 'error').mockImplementation(() => { });

const returnRandomString = () => Math.random().toString(36).substring(7);

describe(testSuiteName, () => {
  afterEach(() => {
    console.log.mockClear();
    console.error.mockClear();
    jest.clearAllMocks();
    // flushing promises, don't worry about it
    return new Promise(setImmediate);
  });

  it('handleResolvedPromise - uses .then to log and return (in a promise) the value from the passed in promise', async () => {
    const randomValue = `Your random string: ${returnRandomString()}`;
    const resolvedPromise = Promise.resolve(randomValue);

    await handleResolvedPromise(resolvedPromise)
      .then((value) => {
        expect(log).toHaveBeenCalledWith(randomValue);
        expect(value).toBe(randomValue.toUpperCase());

        scoreCounter.correct(expect); // DO NOT TOUCH
      });
  });

  it('handleResolvedOrRejectedPromise - uses .then to log and return (in a promise) the value from the passed in promise', async () => {
    const randomValue = `You're handleResolvedOrRejectedPromise value: ${returnRandomString()}`;
    const resolvedPromise = Promise.resolve(randomValue);

    await handleResolvedOrRejectedPromise(resolvedPromise)
      .then((value) => {
        expect(log).toHaveBeenCalledWith(randomValue);
        expect(value).toBe(randomValue.toUpperCase());

        scoreCounter.correct(expect); // DO NOT TOUCH
      });
  });

  it('handleResolvedOrRejectedPromise - uses .catch to log and safely return (in a promise) null when the passed in promise rejects', async () => {
    const randomValue = `Your random error: ${returnRandomString()}`;
    const expectedErrorLog = `Your error message was: ${randomValue}`;

    const getRejectedPromise = () => Promise.reject(new Error(randomValue));

    await handleResolvedOrRejectedPromise(getRejectedPromise())
      .then((value) => {
        expect(value).toBeNull();
        expect(logError).toHaveBeenCalledWith(expectedErrorLog);
        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((err) => {
        // We should not hit this because your code should not throw an error
        // what is the return value of a .catch? Is it a rejected or resolved value?
        expect(err).toBeNull();
      });
  });

  it('resolvedWrapper - returns a promise that resolves to the value passed in', async () => {
    const randomValue = `Your random string: ${returnRandomString()}`;

    await expect(resolvedWrapper(randomValue)).resolves.toBe(randomValue);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('rejectedWrapper - returns a rejected promise that needs to be caught', async () => {
    const randomValue = `Your random string: ${returnRandomString()}`;

    await expect(rejectedWrapper(randomValue)).rejects.toBeTruthy();

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('rejectedWrapper - the rejected value is a new Error', async () => {
    const randomValue = `Your random string: ${returnRandomString()}`;
    const rejectedValue = rejectedWrapper(randomValue);

    await expect(rejectedValue).rejects.toBeInstanceOf(Error);
    await expect(rejectedValue).rejects.toHaveProperty('message', randomValue);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('pauseForMs - returns a promise, but that promise has no value', async () => {
    await expect(pauseForMs(100)).resolves.toBeUndefined();
  });

  it('pauseForMs - calls set timeout with the passed in number of milliseconds', async () => {
    const ms = 100;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    await pauseForMs(ms);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), ms);
    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('pauseForMs - returns a promise that resolves after the passed in number of milliseconds', async () => {
    const ms = 500;

    const startTime = Date.now();
    await pauseForMs(ms)
      .then(() => {
        const endTime = Date.now();
        const timeDiff = endTime - startTime;
        expect(timeDiff).toBeGreaterThanOrEqual(ms - 50); // timeouts aren't exact
        expect(timeDiff).toBeLessThan(ms + 100);

        scoreCounter.correct(expect); // DO NOT TOUCH
      })
      .catch((err) => {
        expect(err).toBeNull();
      });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
