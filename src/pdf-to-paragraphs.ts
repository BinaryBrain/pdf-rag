import * as fs from 'fs';
import { execSync, spawnSync } from 'child_process';

export function pdfToParagraphs(inputFile: string) {
  console.log(`pdf to text ${inputFile}`);
  const outputFile = inputFile.replace('.pdf', '.txt');

  const proc = spawnSync('pdftotext', ['-layout', inputFile, outputFile]);
  console.log(proc.output.join('\n').toString());

  const text = fs.readFileSync(outputFile, 'utf8');

  const pages = text.split('');
  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];
    // remove 'blank' pages to limit dream
    if (!page.trim()) {
      pages.splice(index--, 1);
    }
  }

  let paragraphs: string[] = [];
  pages.forEach(page => {
    paragraphs = [...paragraphs, ...page.split('\n\n')];
  });

  paragraphs = paragraphs.filter(p => p.trim().length > 0);
  return paragraphs;

  // logs
  paragraphs.forEach(p => {
    console.log('-------------------')
    console.log(p)
  });
};


export function pdfToPages(fileName: string, inputFolder: string, processedFolder: string) {
  console.log(`pdf to text ${fileName}`);
  const outputFile = fileName.replace('.pdf', '.txt');

  const proc = spawnSync('pdftotext', ['-layout', `${inputFolder}/${fileName}`, `${processedFolder}/${outputFile}`]);
  console.log(proc.output.join('\n').toString());

  const text = fs.readFileSync(`${processedFolder}/${outputFile}`, 'utf8');

  const pages = text.split('');
  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];
    // remove 'blank' pages to limit dream
    if (!page.trim()) {
      pages.splice(index--, 1);
    }
  }

  return pages;

  // logs
  pages.forEach(p => {
    console.log('-------------------')
    console.log(p)
  });
};
