# Promises

- [Setup](#setup)
- [Testing Your Code](#testing-your-code)
  - [Submitting On Time](#submitting-on-time)
  - [playground.js](#playgroundjs)
  - [npm test](#npm-test)
- [Question 1: resolvedWrapper](#question-1-resolvedwrapper)
- [question 2: rejectedWrapper](#question-2-rejectedwrapper)
- [Question 3: handleResolvedPromise](#question-3-handleresolvedpromise)
- [Question 4: handleResolvedOrRejectedPromise](#question-4-handleresolvedorrejectedpromise)
- [Question 5: pauseForMs](#question-5-pauseforms)
- [Question 6 - return4RandomColors MODIFY](#question-6---return4randomcolors-modify)
    - [Analyzing the code](#analyzing-the-code)
    - ["What!? WHY ARE YOU MAKING ME READ THIS WITH MY OWN EYES?"](#what-why-are-you-making-me-read-this-with-my-own-eyes)
    - [Promises to the rescue!](#promises-to-the-rescue)
- [Bonus](#bonus)

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

After cloning your repository, make sure to run the following commands:

```sh
npm i
git checkout -b draft
npm t
```

## Testing Your Code

### Submitting On Time

You have to understand that "grades" don't exist at Marcy. We only need performance data in order to know how you're doing, and make sure the people who need help get it as quickly as they can. It's ok if you didn't finish by the deadline! Just show us what you have. We'll have office hours and reviews, and we want to know what you are all struggling with so we can use those meetings effectively. **This is not about grades, its about seeing what you know, and where we can help!**

### playground.js

The most straightforward way to test your code is to test your code by hand as you work. Invoke your functions and use `console.log()` to print out the results. Then, `cd` into the `src/` directory and use the `node <file_name>` command to run your JavaScript files. 

You can also create what's called a "playground" (or "sandbox") file where you import any code you need, and then mess around with that file. We've included one in the `src` directory so you can see it. Run that program using `node src/playground.js`.

### npm test

Before submitting your code, make sure you got things right by running the provided automated tests.

You can do this using the commands:

```sh
npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change
```

You will know that you have "completed" an assignment once you have passed 75% or more of the automated tests!

## Question 1: resolvedWrapper
Promises have 3 states: 
1. pending, 
2. resolved (or "fulfilled")
3. rejected. 


> #### fulfilled vs resolved
> Now, it's true that "fulfilled" means a promise completed without an error, and "resolved" *technically* means a promise is just completed, and could be either fine *or* have an error. However, **most** people simply say "resolved" meaning no error, and "rejected" meaning an error. So from here on out, that's how we'll refer to promises: **pending, resolved, or rejected.**

The `resolvedWrapper` function should take in any `value` and then return a promise that always resolves to that value.

Example: 
```js
resolvedWrapper(10)
// this returns:
// Promise { 10 }

resolvedWrapper(10)
  .then(value => {
    console.log(value)
    // this logs:
    // 10
  });
```

## question 2: rejectedWrapper
The other side of the promise coin is rejection. When promises reject, they will often reject with an [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error). 

You can create an `Error` object using the `Error(message)` constructor function:

```js
const errorMessage = 'Oops!';
const myError = Error(errorMessage);
```

The `rejectedWrapper` function should take in an `errorMessage`, create a new `Error` object with that error message, and return a promise that rejects with the new error object.

Example: 
```js
resolvedWrapper('Oh no!')
  .catch((err) => {
    console.log(err.message)
    // Oh no!
  })
```

Since the promise always rejects, we can test this without using a `.then` and skip straight to the `.catch` to catch the error and print it's message out.

Why are we rejecting with an error instead of just a value? Because it's best practice! 

## Question 3: handleResolvedPromise
OK, we've made promises, but how do we deal with them? Using the `Promise.then()` function! A couple of key facts to remember for this one:
* `Promise.then()` accepts a callback that it will invoke once the Promise resolves. The callback will be invoked with the value of the resolved Promise.
* `Promise.then()` also returns a Promise of its own. The value returned by its callback will be the resolved value of the promise returned by `.then()`.

Write a function `handleResolvedPromise` that takes in a Promise that will always resolve to a string `message`.

Your function should handle the Promise using `.then` by printing out the promise's `message`. 

Your function should ALSO return a new promise with that same message, but now in uppercase.

```js
const yoPromise = Promise.resolve('yo')

const loudPromise = handleResolvedPromise(yoPromise);
// Logs "yo" 

loudPromise.then(console.log);
// Logs "YO"
```

Hint: do not create a new promise using `new Promise()`. Instead, take advantage of the fact that `.then()` returns a promise!

## Question 4: handleResolvedOrRejectedPromise
Write a new function `handleResolvedOrRejectedPromise`. It also takes in a promise, but this time let's handle any possible rejections as well.

If the passed in promise resolves, handle it with `.then`, the behavior should be identical to `handleResolvedPromise`. However, if the passed in promise rejects your function needs to:
- log with `console.error` the message `"Your error message was: [Error's message]"` 
- return `null`

Hint: You can get the error message using the `err.message` property

```js
handleResolvedOrRejectedPromise(Promise.resolve('hi'))
  .then(console.log)

handleResolvedOrRejectedPromise(Promise.reject(Error('Yikes!')))
  .then(console.log)

// logs: hi
// logs: "Your error message was: Yikes!"
// and then logs: "HI"
// and then logs: null
```

## Question 5: pauseForMs
JS gives us timers, [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout). Let's look at `setTimeout` which takes a callback and then calls it after a number of milliseconds have passed:

```js
const myCallback = () => {
  console.log("Delayed for 1 second.");
};

setTimeout(myCallback, 1000);
```

That's cool and all, but even though it's asynchronous code, it's not a promise.

Your mission is to create an asynchronous function `pauseForMs` that takes in a number of milliseconds and returns a promise that resolves after the given number of milliseconds.  This promise will never reject! 

For example: 

```js
// pauseForMs should return a promise that resolves after 1000 milliseconds (1 second)
// at which point the `.then()` callback will execute and print "it's been 1000 milliseconds!"
pauseForMs(1000)
  .then(() => {
    console.log("It's been 1000 milliseconds!");
  });
```

To do this, you must wrap `setTimeout` in a promise. The promise does not need to resolve to any particular value, but it *must* resolve after the time is up so that we can execute code after using `.then()`

## Question 6 - return4RandomColors MODIFY

Note: buckle up. This one is going to confuse you at first. That is intentional.

As we talked about earlier, callback hell is when you have to nest many callback functions, and it's the main motivation for making promises in the first place.

Look at the `get4RandomColorsOld` function below. It uses a callback based `crypto.randomFill` function to get an array of 3 random numbers, and then it feeds those into a helper function to make `rgb` strings. But since it's callback based, the only way to get our `rgb` strings array is to pass in *another* callback. Look:

```js
const numsToRGBColor = ([color1, color2, color3]) => {
  return `rgb(${color1}, ${color2}, ${color3})`;
};

const get4RandomColorsOld = (useColorsCallback) => {
  const colors = [];
  crypto.randomFill(new Uint8Array(3), (err1, buffer1) => {
    if (err1) throw new Error(err1);
    colors.push(numsToRGBColor([...buffer1]));

    crypto.randomFill(new Uint8Array(3), (err2, buffer2) => {
      if (err2) throw new Error(err2);
      colors.push(numsToRGBColor([...buffer2]));

      crypto.randomFill(new Uint8Array(3), (err3, buffer3) => {
        if (err3) throw new Error(err3);
        colors.push(numsToRGBColor([...buffer3]));

        crypto.randomFill(new Uint8Array(3), (err4, buffer4) => {
          if (err4) throw new Error(err4);
          colors.push(numsToRGBColor([...buffer4]));

          useColorsCallback(colors);
        });
      });
    });
  });
};

get4RandomColors((colors) => console.log('colors:', colors));
```
#### Analyzing the code
Blech, what a mess! Let's start by figuring out what this is really doing. First, let's break down what the `randomFill` function does. It looks like this:

```js
crypto.randomFill(new Uint8Array(3), (err, buffer) => {
  ...
});
```
It takes 2 arguments, a buffer structure (here, an array with 3 numbers between 0-255 in it, each representing a color), and a callback function. If there's an error it'll be the first argument of the callback, `err`. If there's no error, `err` will equal `null` and `buffer` will have the array of numbers in it. So far so good?

Then, it looks like we convert the buffer into an array by spreading it, and then passing it into a helper function that turns it into an RGB string.

We do this 4 times with callbacks, and then *finally* to use our 4 colors, we need to pass in a final callback to access the array. What a pain, this is the only way to get all 4 colors.

#### "What!? WHY ARE YOU MAKING ME READ THIS WITH MY OWN EYES?"
Does this code confuse you? Honestly, that's ok! We intentionally chose something *wildly* over engineered (spoiler alert, you do not need `crypto` and buffers to make arrays with 3 numbers in them) because you will see confusing code *all* the time at work. The meta challenge here is to understand the code *enough* to get your job done. You absolutely don't need to understand how `crypto.randomFill` works or what `new Uint8Array(3)` does.

So take a deep breath, and start working out what you *do* need to understand. Carefully read through the starting code (call it, copy it into `playground`, whatever) and then once you have a handle on it, set out on modifying it. I think you'll be surprised at how well you do!

#### Promises to the rescue!

Instead of using callback hell, promises keep everything linear by allowing you to chain `then`s and `catch`. Your mission is to use this code in `modify.js`:

```js
const crypto = require('node:crypto');

/* 
Given an array like [123, 456, 789], returns 'rgb(123,456,789)'
*/
const convertColorsArrToRGB = ([color1, color2, color3]) => {
  return `rgb(${color1}, ${color2}, ${color3})`;
};

const getRandomBytes = () => new Promise((resolve, reject) => {
  crypto.randomFill(new Uint8Array(3), (err, buffer) => {
    if (err) return reject(err);
    const colorsArr = [...buffer]
    // Focus here!
    // An array like this will be resolved: [123, 211, 105]
    resolve(colorsArr);
  });
});

const return4RandomColors = () => {
  const colors = [];
  return getRandomBytes()
    .then(() => {
    })
    .then(() => {
    })
    .then(() => {
    })
    .then(() => {
    })
    .catch((err) => {
      console.error(err);
    });
};

return4RandomColors().then(console.log);
// logs the array with 4 colors [ 'rgb(105, 178, 206)' ... ]
```

...and make it so that `return4RandomColors` returns a promised array of `rgb` strings. Do not modify the given functions `numsToRGBColor` or `getRandomBytes` alright? Just read them and use them!

## Bonus
After you've gotten your tests passing and answered all your short answers, try researching `async/await`. **Don't use it on this assignment** (we want to see if you *get* the fundamentals first), but it's a modern way of writing promises with the `async` and `await` keywords. We'll use them later this week, but you can start reading about them now to get a leg up!
