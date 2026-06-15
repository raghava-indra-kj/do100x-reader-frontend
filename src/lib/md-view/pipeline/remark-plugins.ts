import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { PluggableList } from "unified";
import remarkDisplayMath from "./remark-display-math";

/** Ordered remark pipeline: GFM → math → display-math promotion. */
export const REMARK_PLUGINS: PluggableList = [
  remarkGfm,
  remarkMath,
  remarkDisplayMath,
];
