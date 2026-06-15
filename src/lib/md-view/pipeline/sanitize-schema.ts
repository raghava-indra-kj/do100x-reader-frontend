import { defaultSchema, type Options as SanitizeSchema } from "rehype-sanitize";

/** Cloned copy of the default schema to extend without mutation. */
const base = structuredClone(defaultSchema);

/** KaTeX MathML and SVG tags allowed through sanitization. */
const KATEX_TAGS = [
  "math", "semantics", "annotation", "mrow", "mi", "mo", "mn", "ms", "mtext",
  "mspace", "msup", "msub", "msubsup", "mfrac", "msqrt", "mroot", "mtable",
  "mtr", "mtd", "munder", "mover", "munderover", "mpadded", "mphantom",
  "menclose", "mstyle", "merror",
  "svg", "path", "line", "g", "use", "defs", "rect",
];

/** Extended sanitize schema allowing callout, KaTeX, and GFM task checkboxes. */
export const mdSanitizeSchema: SanitizeSchema = {
  ...base,
  tagNames: [
    ...(base.tagNames ?? []),
    "callout",
    "input",
    ...KATEX_TAGS,
  ],
  attributes: {
    ...base.attributes,
    "*": [
      ...(base.attributes?.["*"] ?? []),
      "className",
      "style",
      "ariaHidden",
      "ariaLabel",
    ],
    callout: ["icon"],
    input: ["type", "checked", "disabled"],
    span: ["className", "style"],
    details: ["open"],
    img: [...(base.attributes?.img ?? []), "src", "alt", "title"],
    a: [...(base.attributes?.a ?? []), "href", "target", "rel"],
    math: ["xmlns", "display"],
    annotation: ["encoding"],
    svg: ["xmlns", "width", "height", "viewBox", "preserveAspectRatio", "style", "ariaHidden"],
    path: ["d", "style"],
    line: ["x1", "x2", "y1", "y2", "style"],
  },
};
