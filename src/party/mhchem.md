---
index: true
source: https://talk.observablehq.com/t/using-mhchem-with-framework/9006
---

# Chemistry notation using mhchem

[mhchem](https://mhchem.github.io/MathJax-mhchem/) is a [${tex`\KaTeX`} extension](https://github.com/KaTeX/KaTeX/blob/main/contrib/mhchem/README.md). To activate it in Framework, you need to explicitly load it with `tex`:

```js echo
import tex from "npm:@observablehq/tex";
import "npm:katex/contrib/mhchem/mhchem.js/+esm";
```

Then call it normally like so:

```md
${tex`\ce{CO2 + H2O <-> H2CO3 <-> HCO3- + H+}`}
```

${tex`\ce{CO2 + H2O <-> H2CO3 <-> HCO3- + H+}`}

${tex`\ce{CO2 + C -> 2 CO}`}

${tex`\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}`}
