const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Names of files:');
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(secretFolder, file.name);
        const extens = filePath.split('.').pop();
        const nameOffFile = filePath.split('.').slice(0, -1).join('.');
        const name = nameOffFile.split('\\').pop();
        fs.stat(filePath, (error, stat) => {
          if (error) {
            console.log(error);
          } else {
            console.log(
              `${name} - ${extens} - ${(stat.size / 1024).toFixed(3)}kb`,
            );
          }
        });
      }
    });
  }
});
