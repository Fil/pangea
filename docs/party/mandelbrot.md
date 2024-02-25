---
title: The Mandelbrot Set in HTML5 Canvas & JavaScript
style: mandelbrot-style.css
index: true
source: https://github.com/cslarsen/mandelbrot-js
---

# Mandelbrot

```js
import {main, draw, getColorPicker, getSamples} from "./mandelbrot.js";
main();
window.update = () => draw(getColorPicker(), getSamples());
```

<div id="description">
  <header>
    <div style="text-align: center;">
      <hr />
      <h1>The Mandelbrot Set</h1>
      <p class="headerText">In HTML5 Canvas and JavaScript</p>
      <hr />
    </div>
  </header>
  <form id="settingsForm" action="javascript:update();">
    <table>
    <tr>
      <td>Rendering time</td>
      <td>
        <span id='renderTime'>0.0</span> seconds</td>
    </tr>
    <tr>
      <td>Speed</td>
      <td>
        <span id='renderSpeed'>0.00</span> pixels /
        <span id='renderSpeedUnit'>second</span>
      </td>
    </tr>
    <tr>
      <td>Iterations</td>
      <td>
        <input class="textInput" size="4" type="text" id="steps" value="50" />
        <input type="checkbox" id="autoIterations" checked="checked"/>
        <small>auto</small></td>
    </tr>
    <tr>
      <td>Escape radius</td>
      <td> <input class="textInput" size="4" type="text"
        id="escapeRadius" value="10.0" /> </td>
    </tr>
    <tr>
      <td>Color scheme</td>
      <td>
        <select id="colorScheme">
          <option value="pickColorGrayscale">Grayscale #1</option>
          <option value="pickColorHSV1">HSV #1</option>
          <option value="pickColorHSV2">HSV #2 Red</option>
          <option value="pickColorHSV3">HSV #2 Blue</option>
          <option value="pickColorGrayscale2">Grayscale #2</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>Supersamples</td>
      <td><input class="textInput" size="4" type="text" id="superSamples" value="1" /></td>
    </tr>
    <tr>
      <td>Scanline update (ms)</td>
      <td><input class="textInput" size="4" type="text"
            id="updateTimeout" value="200" /></td>
    </tr>
    <tr>
      <td colspan="2">&nbsp;</td>
    </tr>
    <tr>
      <td colspan="2"><input type="submit" id="submitButton" value="Draw" />
      &nbsp;
      <input type="reset" id="resetButton" value="Reset" />
      &nbsp;
      <input type="button" id="viewPNG" value="View as PNG" />
      </td>
    </tr>
    </table>
  </form>
  <hr/>
  <div id="bottom">
    <small>
      Made by <a href="https://csl.name">Christian Stigen Larsen</a> &mdash;
      <a href="https://github.com/cslarsen/mandelbrot-js">Code on Github</a>
      <br/> &nbsp; <br/>
      Click + drag to zoom in, shift +click to zoom out.
      You can change the settings above and hit <i>Draw</i> to render
      anew.
    </small>
  </div>
</div>
<div id="canvasContainer">
  <canvas id="canvasMandelbrot" width="0" height="0"> </canvas>
  <canvas id="canvasControls" width="0" height="0"> </canvas>
</div>
<div id="infoBox">
  <span id="infoText"></span>
</div>
