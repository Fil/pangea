---
index: true
source: https://github.com/observablehq/framework/discussions/1909
---

# Toggle switch

Here are two methods to create a [custom toggle input](https://github.com/observablehq/framework/discussions/1909).

First method, create the toggle as HTML and listen to the native _change_ event, to generate the _input_ events expected by [Generators.input](https://observablehq.com/framework/lib/generators#input-element) and Framework’s [view function](https://observablehq.com/framework/reactivity):

```js echo
function toggleSwitch() {
  const form = document.createElement("form");
  form.innerHTML = `<label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
  </label>`;
  const input = form.querySelector("input");
  form.value = input.checked;
  form.addEventListener("change", () => {
    form.value = input.checked;
    form.dispatchEvent(new Event("input", {bubbles: true}));
  });
  return form;
}
```

```js echo
const toggled = view(toggleSwitch());
```

${toggled ? "yea" : "nay"}

---

Second method, piggyback on [Inputs.toggle](https://github.com/observablehq/inputs?tab=readme-ov-file#toggle), and only modify the resulting input:

```js echo
function toggleSwitch1(options) {
  const label = document.createElement("label");
  label.classList.add("switch");
  const slider = document.createElement("span");
  slider.classList.add("slider");
  const form = Inputs.toggle(options);
  form.setAttribute("class", null)
  form.appendChild(label);
  label.appendChild(form.querySelector("input"));
  label.appendChild(slider);
  return form;
}
```

```js echo
const toggled1= view(toggleSwitch1({value: true}));
```

${toggled1 ? "yea" : "nay"}

---

To this we need to add the custom styles we want — for example from [https://uiverse.io/gharsh11032000/green-liger-89](https://uiverse.io/gharsh11032000/green-liger-89):

```html echo
<style>
/* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #9fccfa;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slider:before {
  position: absolute;
  content: "";
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  width: 2em;
  inset: 0;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.switch input:checked + .slider {
  background: #0974f1;
}

.switch input:focus + .slider {
  box-shadow: 0 0 1px #0974f1;
}

.switch input:checked + .slider:before {
  transform: translateX(1.6em);
}

</style>
```
