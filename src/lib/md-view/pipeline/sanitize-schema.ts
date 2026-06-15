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

/** Extended sanitize schema allowing callout, KaTeX, GFM task checkboxes, and safe media. */
export const mdSanitizeSchema: SanitizeSchema = {
  ...base,
  tagNames: [
    ...(base.tagNames ?? []),
    "callout",
    "input",
    "audio",
    "video",
    "track",
    "source",
    "iframe",
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
    // audio — no autoplay (would play without user interaction)
    audio: ["src", "controls", "loop", "muted", "preload"],
    // video — no autoplay; poster URL is protocol-restricted below
    video: ["src", "controls", "loop", "muted", "preload", "poster", "width", "height", "playsinline"],
    // track — subtitle/caption tracks for video
    track: ["src", "kind", "srclang", "label", "default"],
    // source — format-fallback child of audio/video/picture
    source: [...(base.attributes?.source ?? []), "src", "type", "media", "srcset", "sizes"],
    // iframe — src is protocol-restricted to http/https (see protocols below)
    // srcdoc is blocked: it runs arbitrary HTML/JS inline without a network request
    iframe: ["src", "width", "height", "title", "loading", "allowfullscreen", "allow", "sandbox"],
    math: ["xmlns", "display"],
    annotation: ["encoding"],
    svg: ["xmlns", "width", "height", "viewBox", "preserveAspectRatio", "style", "ariaHidden"],
    path: ["d", "style"],
    line: ["x1", "x2", "y1", "y2", "style"],
  },
  // poster is a URL attribute not in the default protocols map — restrict to safe schemes
  protocols: {
    ...(base.protocols ?? {}),
    poster: ["http", "https"],
  },
};
