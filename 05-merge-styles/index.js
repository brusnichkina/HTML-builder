const fs = require('fs');
const path = require('path');
const pathToBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const pathToStyles = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(pathToBundle, 'utf-8');

fs.readdir(pathToStyles, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  }
  console.log('Congratulations!');
  for (let i = 0; i < files.length; i += 1) {
    if (files[i].isFile()) {
      const extens = path.extname(files[i].name);
      if (extens === '.css') {
        const pathThisFile = path.join(pathToStyles, files[i].name);
        const readStream = fs.createReadStream(pathThisFile, 'utf-8');
        readStream.on('data', (chunk) => {
          writeStream.write(chunk);
        });
      }
    }
  }
});
