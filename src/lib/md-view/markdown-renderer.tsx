import Markdown, { type Components } from "react-markdown";
import type { MdViewColors, MdViewFontSizes, MdViewFonts } from "./types/theme";
import { REMARK_PLUGINS } from "./pipeline/remark-plugins";
import { getRehypePlugins } from "./pipeline/rehype-plugins";
import { buildComponentMap } from "./pipeline/component-map";
import { strictUrlTransform } from "./pipeline/url-transform";
import { propsToCssVars } from "./utils/theme-to-css-vars";
import ErrorBoundary from "./error-boundary";

/** Props for the markdown rendering component. */
export interface MarkdownRendererProps {
  markdown: string;
  colors: MdViewColors;
  fontSizes: MdViewFontSizes;
  fonts: MdViewFonts;
  className?: string;
  components?: Partial<Components>;
}

/** Renders markdown into styled React DOM using the provided theme. */
export function MarkdownRenderer({
  markdown,
  colors,
  fontSizes,
  fonts,
  className,
  components,
}: MarkdownRendererProps) {
  const mergedComponents = buildComponentMap(components);
  const style = propsToCssVars(colors, fontSizes, fonts);

  return (
    <div className={`md-view ${className ?? ""}`.trim()} style={style}>
      <ErrorBoundary fallback={markdown}>
        <Markdown
          remarkPlugins={REMARK_PLUGINS}
          rehypePlugins={getRehypePlugins(colors.errorColor)}
          urlTransform={strictUrlTransform}
          components={mergedComponents}
        >
          {markdown}
        </Markdown>
      </ErrorBoundary>
    </div>
  );
}
