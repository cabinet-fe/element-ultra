
/** 确保路径以 / 开头 */
export function ensureStartingSlash(path: string) {
  return /^\//.test(path) ? path : `/${path}`
}

export function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
      if (timeoutId) {
          clearTimeout(timeoutId);
      }
      if (!called) {
          fn();
          called = true;
          setTimeout(() => {
              called = false;
          }, delay);
      }
      else {
          timeoutId = setTimeout(fn, delay);
      }
  };
}