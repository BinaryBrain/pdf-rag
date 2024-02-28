import fs from "fs"
import { pdfToPages, pdfToParagraphs } from "./pdf-to-paragraphs";
import { getVector, store } from "./embeddings";

const inputFolder = "../documents/input";
const processedFolder = "../documents/processed";

async function main() {
  const files = fs.readdirSync(inputFolder);
  for (const fileName of files) {
    const pages = pdfToPages(fileName, inputFolder, processedFolder);

    for (let i = 0; i < pages.length; i++) {
      const vector = await getVector(pages[i]);
      const name = `${fileName}_p${i + 1}`;
      store(name, vector, pages[i], fileName, i + 1);
    }

    fs.renameSync(`${inputFolder}/${fileName}`, `${processedFolder}/${fileName}`);
  }
}

main();
