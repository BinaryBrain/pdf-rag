# PDF RAG

## Install

```sh
npm i
cd client; npm i; cd ..
```

Install [pdftotext](https://pypi.org/project/pdftotext/).

Make sure you have your OpenAI key in your environment as `OPENAI_API_KEY`.

## Index your files

1) Place your PDF files in `documents/input`
2) Run  `node indexer.js`
3) Wait for the process to finish

## Run

First, start the backend:

```sh
npm run dev
```

Then the client:

```sh
cd client
npm run dev
```
