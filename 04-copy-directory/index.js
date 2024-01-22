const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathCopyFile = path.join(__dirname, 'copy-files');

fs.mkdir(pathCopyFile, { recursive: true }, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Folder created successfully!');
});

fs.readdir(pathFile, (error, files) => {
  if (error) {
    console.log(error);
  }
  files.forEach((file) => {
    fs.copyFile(
      path.join(pathFile, file),
      path.join(pathCopyFile, file),
      (error) => {
        if (error) {
          console.log(error);
        }
      },
    );
  });
});
