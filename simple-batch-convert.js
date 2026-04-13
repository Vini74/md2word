#!/usr/bin/env node

/**
 * Simple Batch Markdown to HTML Converter
 * 
 * Конвертирует множество Markdown файлов в один HTML файл.
 * НЕ требует установки дополнительных зависимостей.
 * Использует базовый Markdown парсинг без внешних библиотек.
 * 
 * Использование:
 *   node simple-batch-convert.js [input-folder] [output-file]
 * 
 * Примеры:
 *   node simple-batch-convert.js ./docs output.html
 *   node simple-batch-convert.js ./docs combined.html --separator=line
 */

const fs = require('fs');
const path = require('path');

// Настройки по умолчанию
const options = {
  inputFolder: '.',
  outputFile: 'output.html',
  sortBy: 'name',
  separator: 'page-break',
  title: 'Объединённый документ'
};

// Парсинг аргументов командной строки
function parseArgs() {
  const args = process.argv.slice(2);
  let positionalIndex = 0;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const [key, ...valueParts] = arg.split('=');
      const value = valueParts.join('=') || true;
      
      switch (key) {
        case '--sort':
          options.sortBy = value === 'name' ? 'name' : 'none';
          break;
        case '--separator':
          options.separator = ['page-break', 'line', 'none'].includes(value) ? value : 'page-break';
          break;
        case '--title':
          options.title = value;
          break;
        case '--help':
          printHelp();
          process.exit(0);
        default:
          console.warn(`⚠️ Неизвестный параметр: ${key}`);
      }
    } else {
      if (positionalIndex === 0) {
        options.inputFolder = arg;
      } else if (positionalIndex === 1) {
        options.outputFile = arg;
      }
      positionalIndex++;
    }
  }
}

function printHelp() {
  console.log(`
📝 Simple Batch Markdown to HTML Converter

Использование:
  node simple-batch-convert.js [input-folder] [output-file] [options]

Позиционные аргументы:
  input-folder    Папка с Markdown файлами (по умолчанию: текущая папка)
  output-file     Выходной HTML файл (по умолчанию: output.html)

Опции:
  --sort=name          Сортировать файлы по имени (по умолчанию)
  --sort=none          Не сортировать
  --separator=page-break  Разрыв страницы между файлами (по умолчанию)
  --separator=line        Горизонтальная линия между файлами
  --separator=none        Без разделителей
  --title="Заголовок"    Заголовок документа
  --help                 Показать эту справку

Примеры:
  node simple-batch-convert.js ./docs output.html
  node simple-batch-convert.js ./docs combined.html --separator=line
  `);
}

// Базовый Markdown парсер (упрощённый, без внешних зависимостей)
function simpleMarkdownToHtml(md) {
  let html = md;
  
  // Экранирование HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Блоки кода (```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const lines = code.trim().split('\n');
    const processedLines = lines.map(line => {
      return line.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    });
    return `<pre style="background: #f3f4f6; padding: 12px; border-radius: 6px; border: 1pt solid #d1d5db; font-family: 'Consolas', monospace; font-size: 10pt; line-height: 1.3; overflow-x: auto;">${processedLines.join('\n')}</pre>`;
  });
  
  // Заголовки
  html = html.replace(/^######\s+(.+)$/gm, '<h6 style="font-size: 10pt; color: #777; font-style: italic; margin: 6pt 0 3pt 0;">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 style="font-size: 11pt; color: #666; font-style: italic; margin: 6pt 0 3pt 0;">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 style="font-size: 12pt; color: #555; margin: 8pt 0 4pt 0;">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 style="font-size: 14pt; color: #444; margin: 8pt 0 4pt 0;">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 style="font-size: 18pt; border-bottom: 1px solid #ddd; padding-bottom: 0.3em; margin: 10pt 0 5pt 0;">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 style="font-size: 24pt; border-bottom: 2px solid #667eea; padding-bottom: 0.3em; margin: 12pt 0 6pt 0;">$1</h1>');
  
  // Жирный и курсив
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/~~(.+?)~~/g, '<del style="text-decoration: line-through;">$1</del>');
  
  // Инлайн-код
  html = html.replace(/`([^`]+)`/g, '<code style="font-family: \'Courier New\', monospace; font-size: 10pt; background-color: #f3f4f6; border: 0.5pt solid #e5e7eb; padding: 1pt 4pt; border-radius: 2pt; color: #dc2626;">$1</code>');
  
  // Ссылки
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #0366d6; text-decoration: none;">$1</a>');
  
  // Изображения
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 256px; height: auto; display: block; margin: 8pt 0;">');
  
  // Горизонтальные линии
  html = html.replace(/^---$/gm, '<hr style="border: none; border-top: 2px solid #eee; margin: 1.5em 0;">');
  
  // Цитаты
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote style="border-left: 4px solid #667eea; margin: 10pt 0; padding: 8pt 16pt; background: #f9f9ff;">$1</blockquote>');
  
  // Нумерованные списки (простая обработка)
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    return '<ol style="margin: 6pt 0; padding-left: 24pt;">' + match + '</ol>';
  });
  
  // Маркированные списки
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    if (!match.includes('<ol')) {
      return '<ul style="margin: 6pt 0; padding-left: 24pt;">' + match + '</ul>';
    }
    return match;
  });
  
  // Параграфы (двойные переносы строк)
  html = html.replace(/\n\n/g, '</p><p style="margin: 0 0 8pt 0;">');
  html = '<p style="margin: 0 0 8pt 0;">' + html + '</p>';
  
  // Одиночные переносы строк
  html = html.replace(/\n/g, '<br>');
  
  // Очистка пустых параграфов
  html = html.replace(/<p[^>]*>\s*<\/p>/g, '');
  
  return html;
}

// Получение списка Markdown файлов
function getMarkdownFiles(folder) {
  const files = [];
  
  try {
    const entries = fs.readdirSync(folder);
    
    for (const entry of entries) {
      const fullPath = path.join(folder, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile()) {
        const ext = path.extname(entry).toLowerCase();
        if (['.md', '.markdown', '.txt'].includes(ext)) {
          files.push({
            name: entry,
            path: fullPath,
            size: stat.size
          });
        }
      }
    }
  } catch (err) {
    console.error(`❌ Ошибка чтения папки: ${err.message}`);
    process.exit(1);
  }
  
  if (options.sortBy === 'name') {
    files.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  }
  
  return files;
}

// Чтение содержимого файла
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`❌ Ошибка чтения файла ${filePath}: ${err.message}`);
    return null;
  }
}

// Форматирование размера файла
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' Б';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
  return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
}

// Создание разделителя между файлами
function createFileSeparator(fileName, index) {
  switch (options.separator) {
    case 'page-break':
      return `
<div style="page-break-after: always; margin: 40px 0; border-top: 3px solid #667eea; padding-top: 15px; text-align: center;">
  <p style="margin: 0; color: #667eea; font-size: 14pt; font-weight: bold;">
    Конец документа: ${fileName}
  </p>
  <p style="margin: 5px 0 0 0; color: #888; font-size: 10pt;">
    Далее следует следующий документ...
  </p>
</div>
<div style="page-break-before: always;"></div>
`;
    case 'line':
      return `
<hr style="border: none; border-top: 2px solid #667eea; margin: 30px 0;">
<p style="text-align: center; color: #667eea; font-weight: bold; margin: 10px 0;">
  ${fileName}
</p>
<hr style="border: none; border-top: 2px solid #667eea; margin: 10px 0 30px 0;">
`;
    case 'none':
    default:
      return '';
  }
}

// Основная функция конвертации
function batchConvert() {
  console.log('\n📝 Simple Batch Markdown to HTML Converter\n');
  console.log('─────────────────────────────────────\n');
  
  if (!fs.existsSync(options.inputFolder)) {
    console.error(`❌ Папка не найдена: ${options.inputFolder}`);
    process.exit(1);
  }
  
  const files = getMarkdownFiles(options.inputFolder);
  
  if (files.length === 0) {
    console.log('⚠️ Markdown файлы не найдены в указанной папке.');
    process.exit(0);
  }
  
  console.log(`📂 Папка: ${options.inputFolder}`);
  console.log(`📄 Найдено файлов: ${files.length}\n`);
  
  const fileContents = [];
  for (const file of files) {
    console.log(`  📖 Читаю: ${file.name} (${formatFileSize(file.size)})`);
    
    const content = readFileContent(file.path);
    if (content !== null) {
      fileContents.push({
        name: file.name,
        content: content
      });
    }
  }
  
  if (fileContents.length === 0) {
    console.log('❌ Не удалось прочитать ни одного файла.');
    process.exit(1);
  }
  
  console.log(`\n🔄 Конвертация...\n`);
  
  let combinedHtml = '';
  
  fileContents.forEach((file, index) => {
    console.log(`  🔄 Конвертирую: ${file.name}`);
    
    if (index > 0) {
      combinedHtml += createFileSeparator(file.name, index);
    }
    
    let html = simpleMarkdownToHtml(file.content);
    combinedHtml += html;
  });
  
  const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>${options.title}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.15; margin: 20px; }
  h1 { font-size: 24pt; margin: 12pt 0 6pt 0; }
  h2 { font-size: 18pt; margin: 10pt 0 5pt 0; }
  h3 { font-size: 14pt; margin: 8pt 0 4pt 0; color: #444; }
  h4 { font-size: 12pt; margin: 8pt 0 4pt 0; color: #555; }
  h5 { font-size: 11pt; margin: 6pt 0 3pt 0; color: #666; font-style: italic; }
  h6 { font-size: 10pt; margin: 6pt 0 3pt 0; color: #777; font-style: italic; }
  p { margin: 0 0 8pt 0; }
  ul, ol { margin: 6pt 0; padding-left: 24pt; }
  li { margin: 3pt 0; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1pt solid #ddd; padding: 6pt 10pt; }
  th { background: #f5f5f5; }
  blockquote { margin: 10pt 0; padding: 8pt 16pt; border-left: 4pt solid #667eea; background: #f9f9ff; }
  img { max-width: 256px; height: auto; display: block; margin: 8pt 0; }
  a { color: #0563c1; text-decoration: none; }
</style>
</head>
<body>
<h1>${options.title}</h1>
${combinedHtml}
<hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
<p style="text-align: center; color: #888; font-size: 9pt;">
  Сгенерировано: ${new Date().toLocaleString('ru-RU')} • Simple Batch Markdown Converter
</p>
</body>
</html>`;
  
  try {
    fs.writeFileSync(options.outputFile, fullHtml, 'utf8');
    console.log(`\n✅ Успешно сохранено: ${options.outputFile}\n`);
    console.log('─────────────────────────────────────');
    console.log(`📊 Статистика:`);
    console.log(`   Файлов обработано: ${fileContents.length}`);
    console.log(`   Размер выходного файла: ${formatFileSize(Buffer.byteLength(fullHtml, 'utf8'))}`);
    console.log('');
  } catch (err) {
    console.error(`❌ Ошибка записи файла: ${err.message}`);
    process.exit(1);
  }
}

// Запуск
parseArgs();
batchConvert();
