/**
 *
 * Usage:
 *
 * import {abs, acos, cos, sin} from "/components/math"
 *
 * This notebook contains all definitions found in various d3 modules’ \`src/math.js\` files.
 *
 * If you want every symbol:
 *
 * import {
 *    abs, acos, arcosh, arsinh, asin, atan, atan2, ceil, cos, cosh, deg2rad,
 *    degrees, epsilon, epsilon2, exp, floor, halfPi, haversin, log, max, min,
 *    pi, pow, quarterPi, rad2deg, radians, round, sign, sin, sinci, sinh, sqrt,
 *    sqrt1_2, sqrt2, sqrtPi, tan, tanh, tau
 * } from "/components/math"
 *
 * If you need more, fork away.
 *
 * ![In memoriam Maryam Mirzakhani](https://i0.wp.com/chalkdustmagazine.com/wp-content/uploads/2017/10/cover.jpg)
 * <small>Image adapted from Maryam Mirzakhani by Assad Binakhahi, CC.BY 2.0. [chalkdust magazine](https://chalkdustmagazine.com/features/mathematics-maryam-mirzakhani/)`
 *
 */

export const pi = Math.PI;
export const halfPi = pi / 2;
export const log = Math.log;
export const max = Math.max;
export const min = Math.min;
export const pow = Math.pow;
export const quarterPi = pi / 4;
export const abs = Math.abs;
export const atan = Math.atan;
export const atan2 = Math.atan2;
export const ceil = Math.ceil;
export const cos = Math.cos;
// d3-color variant of degrees
export const deg2rad = pi / 180;
export const degrees = 180 / pi;
export const epsilon = 1e-6;
export const epsilon2 = 1e-12;
export const exp = Math.exp;
export const floor = Math.floor;
export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
export function arcosh(x) {
  return log(x + sqrt(x * x - 1));
}
export function arsinh(x) {
  return log(x + sqrt(x * x + 1));
}
export function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}
export function cosh(x) {
  return (exp(x) + exp(-x)) / 2;
}
export function haversin(x) {
  return (x = sin(x / 2)) * x;
}
export function sinci(x) {
  return x ? x / Math.sin(x) : 1;
}
export function sinh(x) {
  return (exp(x) - exp(-x)) / 2;
}
export function sqrt(x) {
  return x > 0 ? Math.sqrt(x) : 0;
}
export function tanh(x) {
  x = exp(2 * x);
  return (x - 1) / (x + 1);
}
// d3-color variant of radians
export const rad2deg = 180 / Math.PI;
export const radians = pi / 180;
export const round = Math.round;
export const sign =
  Math.sign ||
  function (x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  };
export const sin = Math.sin;
export const sqrt1_2 = Math.SQRT1_2;
export const sqrt2 = sqrt(2);
export const sqrtPi = sqrt(pi);
export const tan = Math.tan;
export const tau = pi * 2;
