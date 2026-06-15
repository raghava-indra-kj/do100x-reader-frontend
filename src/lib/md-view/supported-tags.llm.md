md-view markdown spec. CommonMark + GFM + extensions. Only use syntax listed here.

FRONT MATTER: ---\nkey: value\n---  must be first; silently stripped, never rendered
HEADINGS: # H1  ## H2  ### H3  #### H4  ##### H5  ###### H6
EMPHASIS: **bold**  *italic*  ***bold+italic***  ~~strikethrough~~  `inline code`
LINKS: [text](url)  [text](url "title")  [text][ref]  <url>  bare-url
IMAGE: ![alt](url)
LISTS: - unordered  1. ordered  - [x] checked  - [ ] unchecked  (nestable)
BLOCKQUOTE: > text  (>> for nested)
CODE BLOCK: ```lang\ncode\n```  lang optional; syntax-highlighted
TABLE: | H | H |\n|---|---|\n| v | v |  align: :---: center  ---: right
HR: ---
MATH: $inline expr$  $$\nblock expr\n$$  (KaTeX)
MERMAID: ```mermaid\n...\n```  types: flowchart sequenceDiagram gantt pie classDiagram stateDiagram erDiagram journey timeline mindmap
COLLAPSIBLE: <details><summary>Label</summary>content</details>  add `open` to pre-expand
CALLOUT: <callout icon="emoji">text</callout>  icon optional — prefer over blockquote for tips/warnings/notes
LINE BREAK: line ending with \ or 2 spaces = hard break

BLOCKED URLS: javascript: data: vbscript: file:
UNSUPPORTED — do not use: ==highlight==  ~sub~  ^super^  :emoji-code:  definition lists

RULES:
- Prefer fenced code blocks; always specify language when known
