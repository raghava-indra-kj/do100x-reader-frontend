import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import type { PluggableList } from "unified";
import { mdSanitizeSchema } from "./sanitize-schema";
import rehypeUnwrapBlocks from "./rehype-unwrap-blocks";

/** Builds the ordered rehype pipeline using the themed error color for KaTeX. */
export function getRehypePlugins(errorColor: string): PluggableList {
  return [
    rehypeRaw,
    rehypeUnwrapBlocks,
    rehypeHighlight,
    [rehypeKatex, { throwOnError: false, errorColor }],
    [rehypeSanitize, mdSanitizeSchema],
  ];
}
