import {FileAttachment} from "npm:@observablehq/stdlib";

const penguins = await FileAttachment("../data/penguins.csv").csv();
export const count = penguins.length;
