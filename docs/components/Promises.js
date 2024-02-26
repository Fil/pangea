// https://github.com/observablehq/stdlib/tree/main/src/promises

const timeouts = new Map();

function timeout(now, time) {
  const t = new Promise(function (resolve) {
    timeouts.delete(time);
    const delay = time - now;
    if (!(delay > 0)) throw new Error("invalid time");
    if (delay > 0x7fffffff) throw new Error("too long to wait");
    setTimeout(resolve, delay);
  });
  timeouts.set(time, t);
  return t;
}

export function when(time, value) {
  let now;
  return (now = timeouts.get((time = +time)))
    ? now.then(() => value)
    : (now = Date.now()) >= time
    ? Promise.resolve(value)
    : timeout(now, time).then(() => value);
}

export function delay(duration, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, duration);
  });
}

export function tick(duration, value) {
  return when(Math.ceil((Date.now() + 1) / duration) * duration, value);
}
