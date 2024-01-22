const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'files');
const pathCopyFile = path.join(__dirname, 'copy-files');

fs.mkdir(pathCopyFile, { recursive: true }, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Folder copied successfully!');
});

fs.readdir(pathCopyFile, (error, files) => {
  if (error) {
    console.log(error);
  }
  for (let i = 0; i < files.length; i += 1) {
    const pathToFile = path.join(pathCopyFile, files[i]);
    fs.unlink(pathToFile, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

fs.readdir(pathFile, (error, files) => {
  if (error) console.log(error);
  else
    files.forEach((file) =>
      fs.copyFile(
        path.join(pathFile, file),
        path.join(pathCopyFile, file),
        (error) => {
          if (error) {
            console.log(error);
          }
        },
      ),
    );
});
