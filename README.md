# Markdown to Word Converter

A browser-based tool that converts Markdown to Word-compatible HTML and copies it to clipboard in CF_HTML format for pasting into Microsoft Word.

## What it is

A single-page application (SPA) that runs entirely in your browser. Converts Markdown text to HTML that can be copied to clipboard and pasted into Word with formatting preserved.

## Key Features

- Convert Markdown to Word-compatible HTML with inline styles
- **Image embedding** in documents (base64 conversion during conversion)
- **Source code styling** with preserved indentation (Courier New font)
- "Copy DOC to clipboard" button – creates CF_HTML formatted data for proper Word pasting
- Real-time preview
- Load Markdown files (.md, .markdown, .txt)
- Download result as HTML file
- Auto-conversion on input
- Support for complex structures: nested lists, tables, code blocks, quotes, images, H1-H6 headings

## How to use

1. Open `index.html` in a browser or start a local server (recommended)
2. Enter Markdown in the left field or load a file
3. Make sure "📊 Styles for Word" option is enabled (for image embedding)
4. Click "Convert" (or wait for auto-conversion)
5. Click "Copy DOC to clipboard"
6. Paste (Ctrl+V) into Microsoft Word

## Technical details

- Pure HTML/CSS/JavaScript, no server-side code
- Uses Showdown.js library (included locally in `/lib`)
- Clipboard API for clipboard operations
- **Images are converted to base64** for embedding in documents (works offline in Word)
- **Code formatting preserves indentation** by replacing spaces with `&nbsp;`
- CF_HTML format ensures correct pasting into Word
- All data processed locally, works completely offline

## Running

### Simple method (open file)
Just open `index.html` in a browser.

⚠️ **Important**: When opening the file directly (`file://`), images may not load due to CORS restrictions.

### Recommended method (local server)
For proper image loading, start a local server:

```bash
# Python 3
python -m http.server 8000

# Bind to IPv4
python -m http.server 8000 --bind 0.0.0.0
```

Or use npx:
```bash
npx http-server
```

Then open: `http://localhost:8000`

## Project files

- `index.html` – main application
- `lib/showdown.min.js` – Markdown conversion library
- `lib/icon256.png` – example image for embedding demonstration
- `BigExample.md` – example of a complex Markdown document
- `prompt.txt` – original requirements
- `README_RU.md` – documentation in Russian

## Supported Markdown Elements

- ✅ Headings H1-H6
- ✅ **Bold text**, *italic*, ***bold italic***
- ✅ Strikethrough text
- ✅ `Inline code` and code blocks with preserved indentation
- ✅ [Links](https://example.com)
- ✅ Images (embedded in document as base64)
- ✅ Bulleted and numbered lists
- ✅ Nested lists (4+ levels)
- ✅ Checkboxes (task lists)
- ✅ Tables
- ✅ Quotes with nesting
- ✅ Horizontal rules
- ✅ Line breaks (two spaces at end of line)
- ✅ Special character escaping

## Limitations

- Some advanced Markdown table features may not be supported
- Requires a modern browser with Clipboard API support
- A local server is recommended for proper image loading

## License

MIT