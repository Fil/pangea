---
index: true
---

# HTML inputs

<select id="fruitselect">
  <option>Apple</option>
  <option>Orange</option>
  <option>Pear</option>
</select>

```js
const afruit = view(fruitselect);
```

```js
display(afruit);
```

HTML elements with an `id` are available in JavaScript under the variable of the same name! So you can create an element like this in pure HTML in your page:

```md run=false
<select id="fruitselect">
  <option>Apple</option>
  <option>Orange</option>
  <option>Pear</option>
</select>
```

and then interact with it:

````md run=false
```js
const afruit = view(fruitselect);
```

```js
display(afruit);
```
````
