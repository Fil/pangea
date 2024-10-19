/**
 * This function serializes the evaluation of the given async function, such as
 * a SQL query: invocations of the queued function run one after the other, and
 * only the latest invocation. If the returned function is invoked again while
 * a previous invocation has not yet settled, the previous invocation rejects
 * with an invalidation error.
 *
 * To use, declare a queue in one code block by passing in an async function:
 *
 * ```
 * const sql1 = queue(sql);
 * ```
 *
 * Then call the wrapped function in another code block:
 *
 * ```
 * const r = await sql1`SELECT * FROM table;`
 * ```
 *
 * Note: this is enabled by default for sql in https://github.com/observablehq/framework/pull/1728
 */
export function queue(f) {
  let current;
  let version = 0;
  return async function () {
    const v = ++version;
    try {
      await current;
    } catch {
      // ignore errors
    }
    if (version !== v) throw new Error("invalidated");
    return (current = f.apply(this, arguments));
  };
}
