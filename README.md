# Markdown to Word Converter

A browser-based tool that converts Markdown to Word-compatible HTML and copies it to clipboard for pasting into Microsoft Word. Supports single-file editing and batch processing of multiple files merged into one document.

## What it is

A single-page application (SPA) that runs entirely in your browser. Converts Markdown text to HTML that can be copied to clipboard and pasted into Word with formatting preserved.

## Key Features

### Single File Mode
- Enter Markdown in the text area
- Load individual files (.md, .markdown, .txt)
- Real-time preview
- Auto-conversion on input

### Batch Processing (Multiple Files)
- **Drag & Drop** — drop files from file explorer directly onto the queue panel
- **File picker** — select one or multiple files via dialog
- **Order management** — ↑ ↓ buttons for precise positioning
- **Sort by name** — quick alphabetical sorting
- **Automatic merging** — all files are combined and converted into one document
- **Show filename option** — checkbox to add file names before each section
- **Page breaks** — automatic page breaks between files for Word
- **Queue clearing** — "🗑️ Clear queue" button resets only the file list

### Common Features
- Convert Markdown to Word-compatible HTML with inline styles
- **Image embedding** in documents (base64 conversion)
- **Source code styling** with preserved indentation (Courier New)
- "Copy DOC to clipboard" button – for proper Word pasting
- "Copy HTML to clipboard" button – for raw HTML
- Download result as HTML file
- Support for complex structures: nested lists, tables, code blocks, quotes, images, H1-H6 headings
- **Toast notifications** — floating action messages (10 sec)
- **Status bar** — persistent current state display

## How to Use

### Single File
1. Open `index.html` in a browser or start a local server (recommended)
2. Enter Markdown in the text area or load a file via "📂 Load Markdown"
3. Make sure "📊 Styles for Word" option is enabled (for image embedding)
4. Click "Convert" (or wait for auto-conversion)
5. Click "📋 Copy DOC to clipboard"
6. Paste (Ctrl+V) into Microsoft Word

### Multiple Files
1. Open `index.html` in a browser
2. **Drop files** from your file explorer onto the "📑 File Queue" panel **OR** click "📂 Load Markdown" and select multiple files
3. Files are automatically merged and converted
4. **Reorder files** using ↑ ↓ buttons (auto-conversion triggers automatically)
5. Optionally enable "📄 Show filename" checkbox to add file name headings
6. Click "📋 Copy DOC to clipboard" and paste into Word

### File Queue Controls
| Control | Description |
|---------|-------------|
| ↑ ↓ | Move file up/down in the queue |
| ✕ | Remove file from queue |
| 🔤 Sort by name | Alphabetical sorting |
| ➕ Add more files | Append files to existing queue |
| 🗑️ Clear queue | Reset only the file list |
| 🗑️ Clear (top bar) | Reset everything (editor + queue) |

## Technical Details

- Pure HTML/CSS/JavaScript, no server-side code
- Uses Showdown.js library (included locally in `/lib`)
- Clipboard API for clipboard operations
- **Images are converted to base64** for embedding in documents (works offline in Word)
- **Code formatting preserves indentation** by replacing spaces with `&nbsp;`
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

## Project Files

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
- Requires a modern browser with Clipboard API and Drag & Drop support
- A local server is recommended for proper image loading

## License

MIT
