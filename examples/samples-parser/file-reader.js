const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SAMPLE = 'markdoc-react-nodejs-sample';
const DIR = path.join(__dirname, '../', SAMPLE);
const gitignore = fs
  .readFileSync(path.join(DIR, '.gitignore'), 'utf-8')
  .split('\n')
  .filter((x) => x.trim().length > 0 && x[0] !== '#');

const files = glob.sync('**/*', {
  cwd: DIR,
  ignore: ['node_modules/**', 'package-lock.json', ...gitignore],
  nodir: true
});
const dirs = glob.sync('**/*/', {
  cwd: DIR,
  ignore: ['node_modules/**', 'package-lock.json', ...gitignore]
});

console.log(dirs);
const fileMap = files.reduce((map, file) => {
  fs.dir;
  map[file] = fs.readFileSync(path.join(DIR, file), 'utf-8');
  return map;
}, {});

const output = {
  metadata: { sample: SAMPLE },
  directories: dirs,
  files: fileMap
};

fs.writeFileSync(
  path.join(__dirname, 'out', SAMPLE + '.json'),
  JSON.stringify(output, null, 2)
);
