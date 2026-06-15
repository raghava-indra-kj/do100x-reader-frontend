import { parseMarkdown, safeParseMarkdown, serializeMarkdown } from "@lib/md-parser";
import { defaultColors, defaultFontSizes, defaultFonts } from "@lib/md-parser/default-theme";
import { MarkdownRenderer } from "@lib/md-view";
import "@lib/md-view/md-view.css";
import "@lib/md-view/md-view-hljs.css";
import type { MdSection } from "@lib/md-parser";
import testFileSrc from "@lib/md-parser/test-file.md?raw";

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

function Pre({ children }: { children: string }) {
    return (
        <pre className="overflow-x-auto rounded-md bg-[#16263f] p-3 text-xs leading-relaxed text-[#d7dee9]">
            {children}
        </pre>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#6b655b]">
            {children}
        </p>
    );
}

function SectionNode({ section, depth = 0 }: { section: MdSection; depth?: number }) {
    const indent = depth * 16;
    return (
        <div style={{ marginLeft: indent }} className="border-l-2 border-[#d5cfc4] pl-3 mb-2">
            <div className="text-xs text-[#3c3833]">
                <span className="font-mono text-[#d8431a]">h{section.level || "∅"}</span>
                {" · "}
                <span className="font-semibold">
                    {section.title ?? <span className="italic text-[#6b655b]">preamble</span>}
                </span>
                {section.rawTitle && section.rawTitle !== section.title && (
                    <span className="ml-2 text-[#6b655b]">raw: <span className="font-mono">{section.rawTitle}</span></span>
                )}
            </div>
            {section.content && (
                <div className="mt-0.5 font-mono text-[10px] text-[#6b655b] line-clamp-2">
                    {section.content.slice(0, 120)}{section.content.length > 120 ? "…" : ""}
                </div>
            )}
            {section.children.map((child) => (
                <SectionNode key={child.id} section={child} depth={depth + 1} />
            ))}
        </div>
    );
}

function TestCase({
    label,
    input,
    showRendered = false,
}: {
    label: string;
    input: string;
    showRendered?: boolean;
}) {
    const result = safeParseMarkdown(input);

    return (
        <div className="mb-10 rounded-lg border border-[#d5cfc4] bg-white overflow-hidden">
            <div className="border-b border-[#d5cfc4] bg-[#faf6ef] px-4 py-2">
                <p className="text-sm font-semibold text-[#1c1a17]">{label}</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                    <Label>Input markdown</Label>
                    <Pre>{input.trim()}</Pre>
                </div>
                <div>
                    {result.ok ? (
                        <>
                            {result.data.frontmatter && (
                                <div className="mb-3">
                                    <Label>Frontmatter</Label>
                                    <Pre>{JSON.stringify(result.data.frontmatter, null, 2)}</Pre>
                                </div>
                            )}
                            <Label>Section tree ({result.data.sections.length} root)</Label>
                            <div className="rounded-md border border-[#d5cfc4] bg-[#faf6ef] p-3">
                                {result.data.sections.length === 0 ? (
                                    <p className="text-xs italic text-[#6b655b]">No sections</p>
                                ) : (
                                    result.data.sections.map((s) => (
                                        <SectionNode key={s.id} section={s} />
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <div>
                            <Label>Error (expected)</Label>
                            <Pre>{result.error.name + ": " + result.error.message}</Pre>
                        </div>
                    )}
                </div>
            </div>
            {showRendered && result.ok && (
                <div className="border-t border-[#d5cfc4] p-4">
                    <Label>Serialized → re-rendered via md-view</Label>
                    <div className="rounded-md border border-[#d5cfc4] bg-white p-4">
                        <MarkdownRenderer
                            markdown={serializeMarkdown(result.data)}
                            colors={defaultColors}
                            fontSizes={defaultFontSizes}
                            fonts={defaultFonts}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Test cases
// ---------------------------------------------------------------------------

const CASE_BASIC = `
---
title: My Post
author: Alice
tags: [typescript, markdown]
draft: false
---

## Introduction

This is the introduction body.

### Details

Here are the details.

## Conclusion

Wrapping it up.
`;

const CASE_SETEXT = `
Main Title
==========

Preamble content before sub heading.

Sub Section
-----------

Body under sub section.
`;

const CASE_ATX_CLOSING = `
## Normal Title ##

Body content here.

### Another ## with ## hashes ###

More content.
`;

const CASE_INLINE_FORMATTING = `
## Plain heading

## Heading with **bold** text

## Heading with _italic_ text

## Heading with \`inline code\`

## Heading with **bold and _nested italic_**

## Heading with [a link](https://example.com)
`;

const CASE_PREAMBLE = `
This is preamble content — appears before any heading.

It can span multiple paragraphs.

## First Heading

Content under first heading.
`;

const CASE_NO_HEADINGS = `
Just plain content.

Multiple paragraphs.

No headings at all — entire document is a preamble section.
`;

const CASE_DEEP_NESTING = `
# Chapter One

## Section 1.1

### Topic 1.1.1

#### Detail A

##### Fine point

Content at level 5.

## Section 1.2

Back to level 2.

# Chapter Two

New chapter.
`;

const CASE_SKIP_LEVELS = `
# Top Level

### Skipped h2 — goes straight to h3

#### And h4 under that

## Back to h2 — sibling of h1? No — h2 < h3, so it pops up

Content here.
`;

const CASE_EMPTY = ``;

const CASE_FRONTMATTER_ONLY = `
---
title: Only metadata
status: draft
---
`;

const CASE_INVALID_YAML = `
---
title: valid start
: bad: key: : : :
---

## Should throw MdParseError
`;

const CASE_YAML_ARRAY = `
---
- item one
- item two
---

## Frontmatter must be a mapping not an array
`;

const CASE_ROUNDTRIP = `
---
title: Round-trip test
version: 3
---

Preamble paragraph.

# Chapter

Setext-style headings and closing sequences get normalized.

## Section A ##

Content A.

### Sub A.1

Content A.1.

## Section B

Content B.
`;

const CASE_JSON_SCHEMA = `
---
date: 2024-01-15
flag: 'yes'
count: 42
nothing: null
nested:
  key: value
---

## JSON_SCHEMA enforcement

date must be string "2024-01-15" not a Date object.
'yes' must stay string not boolean true.
`;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MdParserDemoPage() {
    return (
        <div className="min-h-screen bg-[#f4ecdf]">
            <div className="sticky top-0 z-10 border-b border-[#d5cfc4] bg-[#faf6ef] px-6 py-3">
                <p className="text-xs font-medium text-[#6b655b]">
                    md-parser · Demo & Manual Verification · 13 cases
                </p>
            </div>
            <div className="mx-auto max-w-5xl px-6 py-8 space-y-2">

                <p className="text-xs text-[#6b655b] mb-6">
                    Each case shows: raw markdown input (left) → parsed frontmatter + section tree (right).
                    Tree shows level · title · rawTitle (if different from title) · content preview · children.
                </p>

                {/* ── test-file.md ── */}
                <div className="mb-10 rounded-lg border-2 border-[#d8431a] bg-white overflow-hidden">
                    <div className="border-b border-[#d8431a] bg-[#fef3ed] px-4 py-2 flex items-center gap-3">
                        <p className="text-sm font-semibold text-[#1c1a17]">test-file.md — Full file parse + render</p>
                        <span className="text-[11px] font-mono text-[#d8431a]">src/lib/md-parser/test-file.md</span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-4">
                        <div>
                            <Label>Section tree ({parseMarkdown(testFileSrc).sections.length} root sections)</Label>
                            <div className="rounded-md border border-[#d5cfc4] bg-[#faf6ef] p-3 max-h-96 overflow-y-auto">
                                {parseMarkdown(testFileSrc).sections.map((s) => (
                                    <SectionNode key={s.id} section={s} />
                                ))}
                            </div>
                            <div className="mt-3">
                                <Label>Frontmatter</Label>
                                <Pre>{JSON.stringify(parseMarkdown(testFileSrc).frontmatter, null, 2)}</Pre>
                            </div>
                        </div>
                        <div>
                            <Label>Serialized markdown (normalized)</Label>
                            <Pre>{serializeMarkdown(parseMarkdown(testFileSrc))}</Pre>
                        </div>
                    </div>
                    <div className="border-t border-[#d5cfc4] p-4">
                        <Label>Rendered via md-view (from serialized)</Label>
                        <div className="rounded-md border border-[#d5cfc4] bg-white p-6">
                            <MarkdownRenderer
                                markdown={serializeMarkdown(parseMarkdown(testFileSrc))}
                                colors={defaultColors}
                                fontSizes={defaultFontSizes}
                                fonts={defaultFonts}
                            />
                        </div>
                    </div>
                </div>

                <TestCase label="1. Basic — frontmatter + nested sections" input={CASE_BASIC} showRendered />
                <TestCase label="2. Setext headings (=== and ---) — rawTitle must not contain underline" input={CASE_SETEXT} showRendered />
                <TestCase label="3. ATX closing sequence (## Title ##) — trailing ## must be stripped" input={CASE_ATX_CLOSING} showRendered />
                <TestCase label="4. Inline formatting in headings — rawTitle preserves, title strips" input={CASE_INLINE_FORMATTING} />
                <TestCase label="5. Preamble — content before first heading" input={CASE_PREAMBLE} showRendered />
                <TestCase label="6. No headings — entire document is a preamble section" input={CASE_NO_HEADINGS} />
                <TestCase label="7. Deep nesting — h1→h2→h3→h4→h5 with siblings" input={CASE_DEEP_NESTING} />
                <TestCase label="8. Skip levels — h1→h3 (no h2)" input={CASE_SKIP_LEVELS} />
                <TestCase label="9. Empty document — no sections, null frontmatter" input={CASE_EMPTY} />
                <TestCase label="10. Frontmatter only — no sections" input={CASE_FRONTMATTER_ONLY} />
                <TestCase label="11. Invalid YAML — must show MdParseError" input={CASE_INVALID_YAML} />
                <TestCase label="12. YAML array frontmatter — must show MdParseError (not a mapping)" input={CASE_YAML_ARRAY} />
                <TestCase label="13. JSON_SCHEMA — dates stay strings, yes stays string, not coerced" input={CASE_JSON_SCHEMA} />

                <div className="mb-10 rounded-lg border border-[#d5cfc4] bg-white overflow-hidden">
                    <div className="border-b border-[#d5cfc4] bg-[#faf6ef] px-4 py-2">
                        <p className="text-sm font-semibold text-[#1c1a17]">14. Round-trip — parse → serialize → re-render via md-view</p>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Label>Original markdown</Label>
                                <Pre>{CASE_ROUNDTRIP.trim()}</Pre>
                            </div>
                            <div>
                                <Label>Serialized markdown (normalized)</Label>
                                <Pre>{serializeMarkdown(parseMarkdown(CASE_ROUNDTRIP)).trim()}</Pre>
                            </div>
                        </div>
                        <Label>Re-rendered via md-view (from serialized)</Label>
                        <div className="rounded-md border border-[#d5cfc4] bg-white p-4">
                            <MarkdownRenderer
                                markdown={serializeMarkdown(parseMarkdown(CASE_ROUNDTRIP))}
                                colors={defaultColors}
                                fontSizes={defaultFontSizes}
                                fonts={defaultFonts}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
