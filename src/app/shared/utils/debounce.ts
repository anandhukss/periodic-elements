export function createDebounce(delay: number) {
  let debounceTimer: any;

  return function (callback: Function) {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      callback();
    }, delay);
  };
}
