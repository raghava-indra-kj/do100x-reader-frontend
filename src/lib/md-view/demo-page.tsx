import { MarkdownRenderer } from "./markdown-renderer";
import { defaultColors, defaultFontSizes, defaultFonts } from "@lib/md-parser/default-theme";
import testFile from "@lib/md-parser/test-file.md?raw";
import "./md-view.css";
import "./md-view-hljs.css";

export default function MdViewDemoPage() {
    return (
        <div className="mx-auto max-w-3xl px-8 py-10">
            <MarkdownRenderer
                markdown={testFile}
                colors={defaultColors}
                fontSizes={defaultFontSizes}
                fonts={defaultFonts}
            />
        </div>
    );
}
