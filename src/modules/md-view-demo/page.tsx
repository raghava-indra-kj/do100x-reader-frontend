import { MarkdownRenderer } from '@lib/md-view';
import { useThemeStore, THEMES } from '@modules/core/ui/theme/app-theme-store';
import { colorLight, colorDark } from '@modules/reader/theme/color-schema';
import { fontSizeBase } from '@modules/reader/theme/font-sizes';
import { getFontFamilyByValue } from '@modules/reader/theme/font-families';
import '@lib/md-view/md-view.css';
import '@lib/md-view/md-view-hljs.css';

// ─── 1. HEADINGS ─────────────────────────────────────────────────────────────
const SECTION_HEADINGS = `
# 1. HEADINGS

## 1.1 Standard — All Six Levels
# H1 — Page Title
## H2 — Section
### H3 — Sub-section
#### H4 — Topic
##### H5 — Detail
###### H6 — Fine Print

## 1.2 Inline Markup Inside Headings
## Heading with **bold** inside
## Heading with *italic* inside
## Heading with \`inline code\` inside
## Heading with [a link](https://example.com) inside
## Heading with ~~strikethrough~~ inside
## Heading with **bold *and nested italic*** combined

## 1.3 Edge Cases
###### Very long heading: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua

## Heading immediately followed by heading with no blank line
### Sub-heading follows immediately above
`;

// ─── 2. EMPHASIS ─────────────────────────────────────────────────────────────
const SECTION_EMPHASIS = `
# 2. EMPHASIS

## 2.1 Standard Combinations
**Bold** · *Italic* · ***Bold and Italic*** · ~~Strikethrough~~

~~Strike with **bold inside**~~ · **Bold with *italic inside*** · *Italic with ~~strike inside~~*

## 2.2 Should NOT Render as Markup (Ambiguous Cases)
Underscore mid-word: foo_bar_baz → no italic

Double underscore mid-word: foo__bar__baz → no bold

Asterisk with surrounding spaces: * not italic * → literal asterisk

## 2.3 Backslash Escapes — Must Show Literal Characters
\\*not italic\\* · \\_not italic\\_ · \\**not bold\\** · \\~~not strike\\~~

\\# not a heading · \\> not a blockquote · \\- not a list item

## 2.4 Multiple Consecutive Emphasis Spans
**First bold** then **second bold** then **third bold** in one paragraph.

*First italic* then *second italic* — both should render independently.

**bold***italic* — adjacent with no space between closing ** and opening *.
`;

// ─── 3. INLINE CODE ──────────────────────────────────────────────────────────
const SECTION_INLINE_CODE = `
# 3. INLINE CODE

## 3.1 Standard
Use \`console.log()\` for debugging. Import with \`import React from 'react'\`.

## 3.2 Special Characters Inside Code — Must Not Be Parsed
HTML tags: \`<div class="foo">\` · Ampersand: \`foo && bar\` · Pipe: \`cat file | grep x\`

Dollar: \`$HOME/.bashrc\` · Backslash: \`C:\\\\Users\\\\name\` · Template: \`\${variable}\`

## 3.3 Backtick Inside Code — Use Double-Backtick Delimiter
Wrap with double backtick: \`\` let x = \`hello\` \`\` → shows the inner backtick literally.

## 3.4 Very Long Inline Code — Must Scroll or Wrap
\`this_is_an_extremely_long_function_name_that_exceeds_typical_line_width_and_should_not_break_layout_or_overflow_the_container\`
`;

// ─── 4. LINKS ─────────────────────────────────────────────────────────────────
const SECTION_LINKS = `
# 4. LINKS

## 4.1 Standard
[Inline link](https://example.com) · [With title](https://example.com "Hover tooltip here") · Bare URL: https://example.com

Reference-style: [Visit GitHub][gh]

[gh]: https://github.com

## 4.2 Edge Cases
Empty href: [this link has empty href]() — should render but not navigate.

No label text: [](https://example.com) — renders with no visible text.

Image inside link: [![A forest path](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=48&h=48&fit=crop&auto=format&q=80)](https://unsplash.com)

## 4.3 Security — Blocked Protocols (href must be stripped, must not navigate)
[javascript: href](javascript:alert('xss')) — MUST NOT fire alert on click.

[data: URI](data:text/html,<h1>injected</h1>) — MUST NOT load data URI.

[vbscript: href](vbscript:msgbox('xss')) — MUST be blocked.

[file: href](file:///etc/passwd) — MUST be blocked.
`;

// ─── 5. IMAGES ───────────────────────────────────────────────────────────────
const SECTION_IMAGES = `
# 5. IMAGES

## 5.1 Wide Image — Must Constrain to Container Width
![Mountain landscape](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop&auto=format&q=80)

## 5.2 Medium Image
![Books on a shelf](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop&auto=format&q=80)

## 5.3 Small Image — Must Not Stretch Beyond Natural Size
![Small thumbnail](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&h=80&fit=crop&auto=format&q=80)

## 5.4 Image with Long Alt Text
![A serene forest path winding through tall ancient trees with dappled light filtering through the canopy](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&auto=format&q=80)

## 5.5 Image with Title Tooltip
![Laptop on a desk](https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop&auto=format&q=80 "Hover to see this title")

## 5.6 Broken URL — Alt Text Must Be Visible
![This image does not exist — alt text should show here](https://images.unsplash.com/photo-0000000000-nonexistent?w=400)

## 5.7 Empty Alt Text
![](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=100&fit=crop&auto=format&q=60)

## 5.8 Security — Blocked src Protocols (must not load, no execution)
![blocked javascript src](javascript:alert('img-xss'))

![blocked data URI](data:image/svg+xml,<svg><script>alert(1)</script></svg>)
`;

// ─── 6. LISTS ─────────────────────────────────────────────────────────────────
const SECTION_LISTS = `
# 6. LISTS

## 6.1 Deeply Nested Unordered (4 Levels)
- Level 1
  - Level 2
    - Level 3
      - Level 4 — deepest

## 6.2 Loose List — Blank Lines Between Items
- First item

- Second item (blank line above → each item wrapped in \`<p>\`)

- Third item

## 6.3 Mixed Ordered + Unordered Nesting
1. Ordered item one
   - Unordered child A
   - Unordered child B
     1. Ordered grandchild
     2. Ordered grandchild two
2. Ordered item two

## 6.4 Custom Start Index
Starts at 5:
5. Fifth
6. Sixth
7. Seventh

## 6.5 Task List with Inline Markup
- [x] **Bold completed task**
- [x] Task with \`inline code\`
- [ ] Task with [a link](https://example.com)
- [ ] Task with ~~strikethrough~~ in label

## 6.6 List Item Containing a Code Block
- Item before the code block

  \`\`\`javascript
  // Indented code block inside list item
  const x = 42;
  \`\`\`

- Item after the code block
`;

// ─── 7. BLOCKQUOTES ──────────────────────────────────────────────────────────
const SECTION_BLOCKQUOTES = `
# 7. BLOCKQUOTES

## 7.1 Inline Markup Inside Blockquote
> **Bold**, *italic*, \`code\`, ~~strike~~, and [link](https://example.com) all inside a blockquote.

## 7.2 Heading Inside Blockquote
> ## H2 heading inside blockquote
> Paragraph content following the heading.

## 7.3 Code Block Inside Blockquote
> \`\`\`javascript
> // Syntax-highlighted code inside a blockquote
> const x = 42;
> \`\`\`

## 7.4 List Inside Blockquote
> Shopping list:
> - Apples
> - Bananas
> - Oranges

## 7.5 Deeply Nested (5 Levels)
> Level 1
>> Level 2
>>> Level 3
>>>> Level 4
>>>>> Level 5 — deepest nesting

## 7.6 Multi-paragraph Blockquote
> First paragraph of the blockquote. Continues inline to wrap naturally.
>
> Second paragraph, separated by a blank quoted line.
>
> Third paragraph.
`;

// ─── 8. CODE BLOCKS ──────────────────────────────────────────────────────────
const SECTION_CODE_BLOCKS = `
# 8. CODE BLOCKS

## 8.1 Multiple Languages with Syntax Highlighting
\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

\`\`\`typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
\`\`\`

\`\`\`python
result = [x ** 2 for x in range(10) if x % 2 == 0]
\`\`\`

\`\`\`rust
fn fib(n: u64) -> u64 {
    match n { 0 => 0, 1 => 1, _ => fib(n-1) + fib(n-2) }
}
\`\`\`

\`\`\`sql
SELECT u.name, COUNT(a.id) AS total
FROM users u LEFT JOIN articles a ON a.user_id = u.id
GROUP BY u.id ORDER BY total DESC LIMIT 10;
\`\`\`

\`\`\`css
.md-view { font-family: var(--md-font-family-prose); line-height: 1.75; }
\`\`\`

## 8.2 Unknown Language — Must Render as Plain Monospace (No Highlighting)
\`\`\`brainfuck
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.
\`\`\`

## 8.3 No Language — Plain Block
\`\`\`
plain block, no language specified, no highlighting
just monospace text
\`\`\`

## 8.4 Empty Code Block — Must Not Crash
\`\`\`javascript
\`\`\`

## 8.5 HTML Tags Inside Code — Must Be Escaped, Not Rendered
\`\`\`html
<script>alert('this must not run')</script>
<img src="x" onerror="alert('xss')">
<a href="javascript:void(0)">dangerous link</a>
\`\`\`

## 8.6 Very Long Single Line — Container Must Scroll Horizontally
\`\`\`javascript
const result = someVeryLongFunctionName(argumentNumberOne, argumentNumberTwo, argumentNumberThree, argumentNumberFour, argumentNumberFive, argumentNumberSix);
\`\`\`
`;

// ─── 9. TABLES ───────────────────────────────────────────────────────────────
const SECTION_TABLES = `
# 9. TABLES

## 9.1 All Column Alignments
| Left aligned | Center aligned | Right aligned | Default |
|:-------------|:--------------:|--------------:|---------|
| text         | text           | 999           | text    |
| longer value | also longer    | 1,234,567     | value   |

## 9.2 Markdown Inside Cells
| Element       | Syntax           | Renders?                     |
|---------------|------------------|-------------------------------|
| Bold          | \`**text**\`     | **bold**                      |
| Italic        | \`*text*\`       | *italic*                      |
| Inline code   | backtick         | \`code\`                      |
| Link          | \`[text](url)\`  | [example](https://example.com)|
| Strikethrough | \`~~text~~\`     | ~~struck~~                    |

## 9.3 Empty Cells
| Col A | Col B | Col C |
|-------|-------|-------|
| value |       | value |
|       |       |       |
| value | value |       |

## 9.4 Header Only — No Body Rows
| Package | Version | License |
|---------|---------|---------|

## 9.5 Wide Table — Horizontal Scroll Test
This table has long content in every cell and must scroll horizontally inside the reader without causing page-level overflow.

| Package Name            | Current Version | Latest Version | License       | Weekly Downloads | Bundle Size (min+gz) | TypeScript | Tree-shakeable | Last Published  |
|-------------------------|:---------------:|:--------------:|---------------|----------------:|---------------------:|:----------:|:--------------:|-----------------|
| react                   | 19.2.7          | 19.2.7         | MIT           |     25,000,000  | 11.5 kB              | ✅         | ✅             | 3 months ago    |
| react-dom               | 19.2.7          | 19.2.7         | MIT           |     23,000,000  | 130 kB               | ✅         | ❌             | 3 months ago    |
| react-router-dom        | 7.17.0          | 7.17.0         | MIT           |      8,500,000  | 23.1 kB              | ✅         | ✅             | 2 weeks ago     |
| remark-gfm              | 4.0.1           | 4.0.1          | MIT           |      3,200,000  | 3.8 kB               | ✅         | ✅             | 8 months ago    |
| remark-math             | 6.0.0           | 6.0.0          | MIT           |        980,000  | 1.2 kB               | ✅         | ✅             | 1 year ago      |
| remark-frontmatter      | 5.0.0           | 5.0.0          | MIT           |      4,100,000  | 1.8 kB               | ✅         | ✅             | 6 months ago    |
| rehype-highlight        | 7.0.2           | 7.0.2          | MIT           |        620,000  | 0.9 kB               | ✅         | ✅             | 9 months ago    |
| rehype-katex            | 7.0.1           | 7.0.1          | MIT           |        540,000  | 0.4 kB               | ✅         | ✅             | 9 months ago    |
| rehype-sanitize         | 6.0.0           | 6.0.0          | MIT           |      1,700,000  | 2.1 kB               | ✅         | ✅             | 1 year ago      |
| mermaid                 | 11.x            | 11.x           | MIT           |      1,200,000  | 742 kB               | ✅         | ❌             | 1 month ago     |
| katex                   | 0.17.0          | 0.17.0         | MIT           |      3,800,000  | 97.3 kB              | ✅         | ❌             | 5 months ago    |
| highlight.js            | 11.11.1         | 11.11.1        | BSD-3-Clause  |     12,000,000  | 27.4 kB              | ✅         | ✅             | 4 months ago    |

## 9.6 Tall Table — Many Rows
| Rank | Country          | Population (M) | Area (km²)  | Capital City    | Currency        |
|-----:|------------------|---------------:|------------:|-----------------|-----------------|
|    1 | China            | 1,412          | 9,596,960   | Beijing         | Chinese Yuan    |
|    2 | India            | 1,380          | 3,287,263   | New Delhi       | Indian Rupee    |
|    3 | United States    | 331            | 9,833,517   | Washington D.C. | US Dollar       |
|    4 | Indonesia        | 273            | 1,904,569   | Jakarta         | Indonesian Rupiah |
|    5 | Pakistan         | 220            | 881,913     | Islamabad       | Pakistani Rupee |
|    6 | Brazil           | 215            | 8,515,767   | Brasília        | Brazilian Real  |
|    7 | Nigeria          | 206            | 923,768     | Abuja           | Nigerian Naira  |
|    8 | Bangladesh       | 167            | 147,570     | Dhaka           | Bangladeshi Taka|
|    9 | Russia           | 146            | 17,098,242  | Moscow          | Russian Ruble   |
|   10 | Ethiopia         | 115            | 1,104,300   | Addis Ababa     | Ethiopian Birr  |
`;

// ─── 10. MATH ─────────────────────────────────────────────────────────────────
const SECTION_MATH = `
# 10. MATH — KaTeX

## 10.1 Inline Math
Euler identity: $e^{i\\pi} + 1 = 0$ · Pythagoras: $a^2 + b^2 = c^2$ · Energy: $E = mc^2$

## 10.2 Block Math
$$
\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}
$$

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

$$
\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}
$$

## 10.3 Math Inside Lists and Blockquotes
- Circle area: $A = \\pi r^2$
- Sphere volume: $V = \\frac{4}{3}\\pi r^3$

> Bayes theorem: $P(A|B) = \\frac{P(B|A)\\cdot P(A)}{P(B)}$

## 10.4 Invalid LaTeX — Must Show Error State, Must Not Crash
$$
\\invalidcommand{this is broken}
$$

Inline broken: $\\alsobrok{en}$ — error displayed inline, no crash.
`;

// ─── 11. MERMAID ─────────────────────────────────────────────────────────────
const SECTION_MERMAID = `
# 11. MERMAID DIAGRAMS

## 11.1 Flowchart
\`\`\`mermaid
graph TD
  A[Start] --> B{Input valid?}
  B -->|Yes| C[Process data]
  B -->|No| D[Show error]
  C --> E[Save to storage]
  D --> F[Log error]
  E --> G[Return OK]
  F --> G
\`\`\`

## 11.2 Sequence Diagram
\`\`\`mermaid
sequenceDiagram
  actor User
  participant App
  participant API
  participant DB
  User->>App: Click Save
  App->>API: POST /articles
  API->>DB: INSERT
  DB-->>API: OK
  API-->>App: 201 Created
  App-->>User: Toast success
\`\`\`

## 11.3 Class Diagram
\`\`\`mermaid
classDiagram
  class Article {
    +String id
    +String title
    +String content
    +render() String
  }
  class User {
    +String id
    +String name
    +articles Article[]
  }
  User --> Article : owns
\`\`\`

## 11.4 State Diagram
\`\`\`mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Loading : fetch()
  Loading --> Success : data ok
  Loading --> Error : request failed
  Success --> Idle : reset
  Error --> Idle : retry
\`\`\`

## 11.5 Pie Chart
\`\`\`mermaid
pie title md-view Tag Categories
  "Block Elements" : 13
  "Inline Elements" : 7
  "Math" : 2
  "Diagrams" : 1
  "Custom" : 2
\`\`\`

## 11.6 Invalid Mermaid Syntax — Must Fallback to Code Block, Must Not Crash
\`\`\`mermaid
this is NOT valid mermaid @@@###???
broken === diagram syntax
\`\`\`

## 11.7 Empty Mermaid Block — Must Not Crash
\`\`\`mermaid
\`\`\`
`;

// ─── 12. DETAILS ─────────────────────────────────────────────────────────────
const SECTION_DETAILS = `
# 12. DETAILS / COLLAPSIBLE

## 12.1 Collapsed by Default
<details>
  <summary>Click to expand</summary>
  Basic hidden content revealed on click.
</details>

## 12.2 Open by Default
<details open>
  <summary>Pre-expanded</summary>
  Visible without any interaction needed.
</details>

## 12.3 Complex Content Inside
<details>
  <summary>Contains table, code, and math</summary>

  | Col A | Col B |
  |-------|-------|
  | foo   | 123   |
  | bar   | 456   |

  \`\`\`javascript
  const x = 42;
  \`\`\`

  Inline math inside: $E = mc^2$

</details>

## 12.4 No Summary Tag — Browser Uses Default Label
<details>
  Hidden content with no summary element. Browser renders "Details" as the label.
</details>

## 12.5 Empty Details — Must Not Crash
<details>
  <summary>Empty body</summary>
</details>
`;

// ─── 13. CALLOUT ─────────────────────────────────────────────────────────────
const SECTION_CALLOUT = `
# 13. CALLOUT

## 13.1 All Icon Variants
<callout icon="💡">Tip callout — for helpful advice.</callout>

<callout icon="⚠️">Warning callout — for potentially destructive actions.</callout>

<callout icon="❌">Error callout — for failure states.</callout>

<callout icon="✅">Success callout — for confirmations.</callout>

<callout icon="📌">Note callout — for important context.</callout>

## 13.2 No Icon
<callout>Plain callout — no icon attribute, still styled distinctly from a blockquote.</callout>

## 13.3 Rich Content Inside
<callout icon="💡">
  This callout contains **bold**, *italic*, \`inline code\`, and a [link](https://example.com).
</callout>

## 13.4 List Inside Callout
<callout icon="📋">
  Required steps:
  - Step one — do this first
  - Step two — then this
  - Step three — finally this
</callout>

## 13.5 Empty Callout — Must Not Crash
<callout icon="💡"></callout>
`;

// ─── 14. HTML SECURITY ───────────────────────────────────────────────────────
const SECTION_HTML_SECURITY = `
# 14. HTML PASSTHROUGH — SECURITY TESTS

Visually confirm: no alerts fire, no iframes appear, no styles apply.

## 14.1 Blocked Tags — Must Be Completely Stripped

script (no alert should fire):
<script>alert('XSS via script tag')</script>

style (no CSS should apply — body must remain visible):
<style>body { display: none !important; } * { color: red !important; }</style>

object:
<object data="https://example.com" type="text/html"></object>

embed:
<embed src="https://example.com">

## 14.2 Blocked Event Attributes — Must Be Stripped
Image with onerror (no alert on broken load):
<img src="x-broken.png" onerror="alert('onerror fired')" alt="broken image — no alert">

Anchor with onclick (no alert on click):
<a href="https://example.com" onclick="alert('onclick fired')">Click me — onclick must be stripped</a>

Div with onmouseover (no alert on hover):
<div onmouseover="alert('hover fired')">Hover here — no alert should fire</div>

## 14.3 Blocked URL Protocols in Attributes
javascript: in anchor href (must be stripped — no navigation, no alert):
<a href="javascript:alert('href-xss')">This link must not fire alert on click</a>

javascript: in img src (must be stripped — no execution):
<img src="javascript:alert('img-src-xss')" alt="src must be stripped">

## 14.4 Allowed HTML — Must Pass Through Intact
<strong>strong</strong> · <em>em</em> · <u>underline</u> · <code>code</code>

<kbd>Ctrl</kbd> + <kbd>S</kbd> keyboard shortcut notation.

<u>Underline — only possible via raw HTML, no markdown equivalent.</u>
`;

// ─── 15. SPECIAL CHARACTERS & UNICODE ────────────────────────────────────────
const SECTION_UNICODE = `
# 15. SPECIAL CHARACTERS & UNICODE

## 15.1 Characters That Could Confuse the HTML Parser
Less-than: 3 < 5 · Greater-than: 10 > 7 · Ampersand: cats & dogs

Generic types in text: Array<string> and Map<string, number> — must not parse as HTML tags.

URL with ampersand: https://example.com/search?q=foo&page=2

## 15.2 HTML Named Entities
&amp; &lt; &gt; &quot; &apos; &copy; &trade; &reg; &mdash; &ndash; &hellip; &nbsp;

## 15.3 Unicode — Various Scripts
CJK: 日本語テスト · 中文测试 · 한국어 테스트

Arabic (RTL): اختبار النص العربي

Mathematical: ∑ ∏ ∫ ∂ ∇ ∞ ≈ ≠ ≤ ≥ √ ×

Emoji in prose: 🚀 launch · 💡 idea · ⚠️ warning · ✅ done · 🔥 hot · 💎 gem
`;

// ─── 16. HORIZONTAL RULES ────────────────────────────────────────────────────
const SECTION_HR = `
# 16. HORIZONTAL RULES — All Three Syntaxes

Dashes:

---

Asterisks:

***

Underscores:

___

HR immediately after a paragraph (no blank line — should still render as HR, not setext heading):
Paragraph text here.
---
`;

// ─── 17. LINE BREAKS ─────────────────────────────────────────────────────────
const SECTION_LINE_BREAKS = `
# 17. LINE BREAKS

## 17.1 Soft Break — Single Newline Renders Inline
Line one
Line two — continues on same rendered line with a space (not a new paragraph)

## 17.2 Hard Break via Trailing Backslash
Line A\\
Line B — starts on a new rendered line (hard break)

## 17.3 Multiple Consecutive Hard Breaks
Line 1\\
Line 2\\
Line 3\\
Line 4 — each must be on its own line

## 17.4 Paragraph Separation via Blank Line
First paragraph. Ends here.

Second paragraph. Blank line above creates a separate \`<p>\` element.

Third paragraph. Three separate block-level elements total.
`;

// ─── 19. AUDIO & VIDEO ───────────────────────────────────────────────────────
const SECTION_MEDIA = `
# 19. AUDIO & VIDEO

## 19.1 Audio — Basic Player
<audio controls preload="metadata" src="https://www.w3schools.com/html/horse.mp3">
  Your browser does not support the audio element.
</audio>

## 19.2 Audio — Multiple Source Formats (Format Fallback)
Browser picks the first format it supports; fallback to MP3 if OGG unsupported:
<audio controls preload="metadata">
  <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

## 19.3 Audio — Loop and Muted
Loop and muted attributes must pass through (autoplay is stripped so it won't start on its own):
<audio controls loop muted preload="metadata" src="https://www.w3schools.com/html/horse.mp3">
</audio>

## 19.4 Audio — Broken Source (Browser Handles Gracefully)
<audio controls src="https://example.com/does-not-exist.mp3">
</audio>

## 19.5 Video — Controls and Poster Thumbnail
<video controls preload="metadata" poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=360&fit=crop&auto=format&q=80">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>

## 19.6 Video — No Controls (Decorative / Muted Loop)
Controls attribute omitted — player renders but offers no UI; muted loop attributes pass through:
<video muted loop preload="metadata" poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&h=360&fit=crop&auto=format&q=80">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

## 19.7 Video — with Track (Subtitle Caption)
<video controls preload="metadata">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  <track kind="subtitles" src="https://www.w3schools.com/tags/demo_vtt.vtt" srclang="en" label="English" default>
</video>

## 19.8 Video — Broken Source
<video controls preload="none">
  <source src="https://example.com/does-not-exist.mp4" type="video/mp4">
</video>

## 19.9 Security — \`autoplay\` Must Be Stripped
These elements have \`autoplay\` — it must be removed by the sanitizer. Neither must start playing automatically on page load:
<audio autoplay controls src="https://www.w3schools.com/html/horse.mp3"></audio>
<video autoplay controls muted preload="metadata">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>

## 19.10 Security — Event Handlers Must Be Stripped (No Alerts)
\`onplay\`, \`onended\`, \`onerror\`, and all other event handlers must be removed:
<audio controls src="https://www.w3schools.com/html/horse.mp3" onplay="alert('audio-onplay')" onended="alert('audio-onended')" onerror="alert('audio-onerror')"></audio>

<video controls preload="metadata" onerror="alert('video-onerror')" onplay="alert('video-onplay')">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" onerror="alert('source-onerror')">
</video>

## 19.11 Security — \`javascript:\` in src and poster Must Be Blocked
<audio controls src="javascript:alert('audio-src-xss')"></audio>

<video controls poster="javascript:alert('poster-xss')">
  <source src="javascript:alert('video-src-xss')">
</video>

## 19.12 iframe — YouTube Embed
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="560"
  height="315"
  title="YouTube video player"
  loading="lazy"
  allowfullscreen>
</iframe>

## 19.13 iframe — With Sandbox Attribute
Sandbox restricts what the frame can do (no scripts, no same-origin access):
<iframe
  src="https://example.com"
  width="100%"
  height="250"
  title="Sandboxed frame"
  sandbox="allow-same-origin"
  loading="lazy">
</iframe>

## 19.14 Security — \`srcdoc\` Must Be Stripped (No Inline HTML Injection)
<iframe srcdoc="<script>alert('srcdoc-xss')</script><h1>injected</h1>" width="400" height="200" title="srcdoc test"></iframe>

## 19.15 iframe — With \`allow\` (Permission Features)
The \`allow\` attribute passes through, enabling features like fullscreen, autoplay, etc.:
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315" title="YouTube with allow" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 19.16 Security — Event Handlers and \`javascript:\` src Blocked
<iframe src="javascript:alert('iframe-src-xss')" title="blocked src"></iframe>
<iframe src="https://example.com" onload="alert('iframe-onload')" title="blocked onload"></iframe>
`;

// ─── 18. FRONT MATTER ────────────────────────────────────────────────────────
const SECTION_FRONT_MATTER = `
# 18. FRONT MATTER

Front matter at the top of this document was:

\`\`\`yaml
---
title: md-view Rigorous Test Suite
author: Internal QA
tags: [test, md-view, demo]
draft: true
---
\`\`\`

**Expected:** that block was completely stripped — it did not render as two horizontal rules with YAML text between them. If you see raw YAML at the very top of the page, front matter stripping is broken.

Mid-document triple-dashes are horizontal rules (correct behaviour):

---

The line above is a horizontal rule, not a broken setext heading indicator.
`;

const DEMO_MARKDOWN = `---
title: md-view Rigorous Test Suite
author: Internal QA
tags: [test, md-view, demo]
draft: true
---

# md-view — Rigorous Test Suite

> **Internal use only.** Tests positive cases, edge cases, nesting combinations, error states, and security sanitization for every supported element. Verify each section visually.

---
${SECTION_HEADINGS}
---
${SECTION_EMPHASIS}
---
${SECTION_INLINE_CODE}
---
${SECTION_LINKS}
---
${SECTION_IMAGES}
---
${SECTION_LISTS}
---
${SECTION_BLOCKQUOTES}
---
${SECTION_CODE_BLOCKS}
---
${SECTION_TABLES}
---
${SECTION_MATH}
---
${SECTION_MERMAID}
---
${SECTION_DETAILS}
---
${SECTION_CALLOUT}
---
${SECTION_HTML_SECURITY}
---
${SECTION_UNICODE}
---
${SECTION_HR}
---
${SECTION_LINE_BREAKS}
---
${SECTION_FRONT_MATTER}
---
${SECTION_MEDIA}

---

*End of rigorous test suite — 19 sections, all supported tags covered.*
`;

const defaultFonts = getFontFamilyByValue('lexend');

export default function MdViewDemoPage() {
    const { state: themeState } = useThemeStore();
    const colors = themeState.theme === THEMES[1].value ? colorDark : colorLight;

    return (
        <div className="min-h-screen overflow-x-hidden bg-[var(--color-surface-canvas)]">
            <div className="sticky top-0 z-10 border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-6 py-3">
                <p className="text-xs font-medium text-[var(--color-text-muted)]">
                    md-view · Rigorous Test Suite · 19 sections · Edge cases + Security
                </p>
            </div>
            <div className="mx-auto max-w-3xl px-8 py-10">
                <MarkdownRenderer
                    markdown={DEMO_MARKDOWN}
                    colors={colors}
                    fontSizes={fontSizeBase}
                    fonts={defaultFonts}
                />
            </div>
        </div>
    );
}
