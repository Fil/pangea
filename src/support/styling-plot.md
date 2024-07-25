# Styling Plot

<style>
  .card.green-card {
    background-color: #f0f9eb;
    color: black;
  }
  .card.green-card h2 {
    color: var(--theme-dark-alt)
  }
  .card.green-card g[aria-label="line"] {
    color: red;
  }
</style>

<div class="grid grid-cols-2">
  <div class="card green-card">
    <h2>Lorem ipsum</h2>
    ${Plot.lineY({length:100}, Plot.mapY("cumsum", {y: Math.random})).plot({
      title: "HELLO GREEN"
    })}
    <p>Et malesuada fames ac turpis. Integer vitae justo eget magna fermentum iaculis eu non diam. Aliquet risus feugiat in ante metus dictum at. Consectetur purus ut faucibus pulvinar.</p>
  </div>
  <div class="card">
    <h2>Lorem ipsum</h2>
    <p>Id ornare arcu odio ut sem nulla pharetra. Aliquet lectus proin nibh nisl condimentum id venenatis a. Feugiat sed lectus vestibulum mattis ullamcorper velit. Aliquet nec ullamcorper sit amet. Sit amet tellus cras adipiscing. Condimentum id venenatis a condimentum vitae. Semper eget duis at tellus. Ut faucibus pulvinar elementum integer enim.</p>
    <p>Et malesuada fames ac turpis. Integer vitae justo eget magna fermentum iaculis eu non diam. Aliquet risus feugiat in ante metus dictum at. Consectetur purus ut faucibus pulvinar.</p>
  </div>
</div>
