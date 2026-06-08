# Project Status Report

## 📋 Overview
This is an **example** of Markdown to *Microsoft Word* conversion, demonstrating all available features.

### 📐 All Heading Levels (H1–H6)

# Heading H1 — Main Document Title
## Heading H2 — Section
### Heading H3 — Subsection
#### Heading H4 — Detailed Subsection
##### Heading H5 — Additional Level
###### Heading H6 — Smallest Level

> 💡 All 6 heading levels are supported and converted with appropriate Word styles.

### Key Features:
- ✅ Heading conversion for all levels
- ✅ **Bold text**, *italic*, ***bold italic***
- ✅ ~~Strikethrough text~~ and `inline code`
- ✅ [Links](https://example.com) and images
- ✅ Tables and blockquotes
- ✅ HTML tags (if enabled)
- ✅ Auto-detection of URLs
- ✅ Typographic replacements
- ✅ Open links in new window
- ✅ Complete HTML document
- ✅ XHTML output

#### Heading H4
This level is used for detailed subsections.

##### Heading H5
Even deeper heading nesting.

###### Heading H6
The smallest heading (rarely used).

## 🔢 Multi-level Lists

### Nested List Example (4 levels):

1. **Strategic Analysis**
    1. Market Research
        1. Competitor Analysis
            1. Price Model Comparison
            2. Market Share Evaluation
        2. Focus Group Surveys
    2. SWOT Analysis
2. **System Design**
    1. Database Architecture
        1. Entity Relationship (ERD)
            1. One-to-Many Relationship Description
            2. Table Indexing

### Mixed Lists:

- Task 1
  - [ ] Subtask 1.1
  - [x] Subtask 1.2 (completed)
    - [ ] Detail 1.2.1
    - [ ] Detail 1.2.2
- Task 2
  1. Stage 2.1
  2. Stage 2.2
     - Substage 2.2.1
     - Substage 2.2.2

## 📊 Data Tables

| Priority | Task | Status | Assignee |
|----------|------|--------|----------|
| 🔴 High | Fix bugs | In progress | John |
| 🟡 Medium | Add tests | Pending | Sarah |
| 🟢 Low | Update docs | Done | Mike |

### Advanced Table with Alignment:

| Left | Center | Right |
|:-----|:------:|------:|
| cell 1 | cell 2 | cell 3 |
| long text | `code` | **bold** |

## 💻 Code Block

```javascript
// Example function with nested conditions
function processData(data) {
  if (data && data.items) {
    return data.items
      .filter(item => item.active)
      .map(item => ({
        id: item.id,
        name: item.name.toUpperCase(),
        // Nested object
        meta: {
          created: new Date(item.timestamp),
          tags: item.tags || []
        }
      }));
  }
  return [];
}
```

## 📝 Blockquotes

> This is an example of a blockquote in Markdown.
>
> > Nested blockquote for demonstration.
> >
> > > Third level of nesting.
>
> Back to second level.

## 🖼️ Images

![Markdown Logo](lib/icon256.png)

*The image above is loaded from the local lib folder.*

## ✨ Additional Formatting

### Line Breaks
This text has two spaces at the end of the previous line,
which creates a forced line break.

### Character Escaping

- Asterisks: &#42;&#42;not bold&#42;&#42;
- Underscores: &#95;&#95;not italic&#95;&#95;
- Hash: &#35;not a heading
- Backtick: &#96;not code&#96;

### Plugin Features

- **Subscript**: H~2~O (water) and X~i~ (variable)
- **Superscript**: X^2^ (squared) and E=mc^2^ (energy)
- **Definition Lists**:
  Term
  : Definition of the term
  Second Term
  : Its definition
- **Underline**: ++important text++ (inserted)
- **Containers**:
::: warning
This is a warning block with a custom class.
:::

::: info
Information block with a different class.
:::

## 🏷️ HTML Tags (if enabled)

You can use HTML tags if the "htmlTags" option is enabled:

- <kbd>Ctrl+C</kbd> to copy
- <mark>Highlighted text</mark>
- <abbr title="HyperText Markup Language">HTML</abbr>
- <small>Small text</small>

## 🔗 Auto-detection of URLs

Just type a URL: https://github.com or email: example@domain.com

## 🖋️ Typographic Replacements

When the "typographer" option is enabled, quotes will be replaced with curly quotes "like this". Also dashes — em dashes.

## 🪟 Open Links in New Window

When the "openLinksInNewWindow" option is enabled, all links open in a new tab: [Example link](https://example.com).

## 📄 Complete HTML Document

When the "completeHTMLDocument" option is enabled, the result will be wrapped in a full HTML structure with DOCTYPE, head, and body.

## ⚙️ XHTML Output

When the "xhtmlOut" option is enabled, tags will be self-closing: <br /> instead of <br>.

## 🎯 Conclusion

1. This document demonstrates all conversion features
2. All elements will preserve formatting in Word
3. Just copy and paste!

---
*Generated locally • [markdown2word converter](https://github.com)*