export function debounceInput(input, delay = 1000) {
  // Wrap the input in a div, and get ready to pass changes up.
  const div = document.createElement("div");
  div.appendChild(input);
  div.value = input.value;

  function pass(value) {
    div.value = value;
    div.dispatchEvent(new Event("input"));
  }

  let timer = null;
  let value;

  // On input, check if we recently reported a value.
  // If we did, do nothing and wait for a delay;
  // otherwise, report the current value and set a timeout.
  function inputted() {
    if (timer !== null) return;
    value = input.value;
    requestAnimationFrame(() => pass(value));
    timer = setTimeout(delayed, delay);
  }

  // After a delay, check if the last-reported value is the current value.
  // If it’s not, report the new value.
  function delayed() {
    timer = null;
    if (value === input.value) return;
    pass((value = input.value));
  }

  input.addEventListener("input", inputted);
  return div;
}
