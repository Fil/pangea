import {parseHTML} from "linkedom";
import {beckerBarleyChart} from "./becker-barley.js";

const {document} = parseHTML("<a>");

const chart = beckerBarleyChart({document, dark: false});

process.stdout.write(
  `${chart}`.replace(
    /^<svg /,
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" '
  )
);
