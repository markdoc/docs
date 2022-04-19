const sampleAppMap = require('./out/markdoc-react-nodejs-sample.json');

const snippets = {};
Object.entries(sampleAppMap.files).forEach(([fileName, fileData]) => {
  const lines = fileData.split('\n');
  let currentSnippet = {};
  for (let lineNo = 0; lineNo < lines.length; lineNo++) {
    const line = lines[lineNo];

    if (line.includes('%%%:')) {
      if (line.includes(': end')) {
        snippets[currentSnippet.id] = currentSnippet;
        currentSnippet.lineRange.push(lineNo - 1);
        currentSnippet = {};
      } else if (line.includes(': start')) {
        const id = line.match(/start \[(.*)\]/)[1];
        console.log(id);
        currentSnippet.id = id;
        currentSnippet.filename = fileName;
        currentSnippet.lineRange = [lineNo + 1];
        currentSnippet.raw = [];
      }
    } else {
      if (currentSnippet.id) {
        currentSnippet.raw.push(line);
      }
    }
  }
});

console.log(snippets);
