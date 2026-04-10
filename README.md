# Markdown to Word Converter

A browser-based tool that converts Markdown to Word-compatible HTML and copies it to clipboard in CF_HTML format for pasting into Microsoft Word.

## What it is

A single-page application (SPA) that runs entirely in your browser. Converts Markdown text to HTML that can be copied to clipboard and pasted into Word with formatting preserved.

## Key Features

- Convert Markdown to Word-compatible HTML
- "Copy DOC to clipboard" button – creates CF_HTML formatted data for proper Word pasting
- Real-time preview
- Load Markdown files (.md, .markdown, .txt)
- Download result as HTML file
- Auto-conversion on input
- Support for complex structures: nested lists, tables, code blocks, quotes

## How to use

1. Open `index.html` in a browser
2. Enter Markdown in the left field or load a file
3. Click "Convert" (or wait for auto-conversion)
4. Click "Copy DOC to clipboard"
5. Paste (Ctrl+V) into Microsoft Word

## Technical details

- Pure HTML/CSS/JavaScript, no server-side code
- Uses Showdown.js library (included locally in `/lib`)
- Clipboard API for clipboard operations
- CF_HTML format ensures correct pasting into Word
- All data processed locally, works completely offline

## Project files

- `index.html` – main application
- `lib/showdown.min.js` – Markdown conversion library
- `BigExample.md` – example of a complex Markdown document
- `prompt.txt` – original requirements
- `README_RU.md` – documentation in Russian

## Running

Just open `index.html` in a browser. For better compatibility, you can run a local server:

```bash
python -m http.server 8000
# or
npx http-server
```

## Limitations

- Some advanced Markdown table features may not be supported
- Requires a modern browser with Clipboard API support
- Images from external URLs will load only with internet connection

## License

MIT