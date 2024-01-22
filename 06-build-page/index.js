const fs = require('fs');
const path = require('path');
const templateFile = path.join(__dirname, 'template.html');
const projectDist = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components');
const pathToIndex = path.join(__dirname, 'project-dist', 'index.html');

fs.mkdir(projectDist, { recursive: true }, (error) => {
  if (error) {
    console.log(error);
  }
});

const readStream = fs.createReadStream(templateFile, 'utf-8');
readStream.on('data', (chunk) => {
  let templateHTML = chunk.toString();
  fs.readdir(components, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error);
    }
    for (let i = 0; i < files.length; i += 1) {
      if (files[i].isFile()) {
        const extens = path.extname(files[i].name);
        if (extens === '.html') {
          const nameOffFile = files[i].name.split('.').shift();
          const thisName = nameOffFile.split('\\').pop();
          let pathToItem = path.join(components, files[i].name);
          const readableComponents = fs.createReadStream(pathToItem, 'utf-8');
          readableComponents.on('data', (data) => {
            let templateData = data.toString();
            if (i === 0 || i < files.length) {
              templateHTML = templateHTML.replaceAll(
                `{{${thisName}}}`,
                templateData,
              );
            }
            if (i === files.length - 1) {
              fs.writeFile(pathToIndex, templateHTML, (error) => {
                if (error) {
                  console.log(error);
                }
              });
            }
          });
        }
      }
    }
  });
});

const pathToBundle = path.join(__dirname, 'project-dist', 'style.css');
const pathToStyles = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(pathToBundle, 'utf-8');

fs.readdir(pathToStyles, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  }
  for (let i = 0; i < files.length; i += 1) {
    if (files[i].isFile()) {
      const extens = path.extname(files[i].name);
      if (extens === '.css') {
        const pathThisFile = path.join(pathToStyles, files[i].name);
        const readStreamBuildPage = fs.createReadStream(pathThisFile, 'utf-8');
        readStreamBuildPage.on('data', (chunk) => {
          writeStream.write(chunk);
        });
      }
    }
  }
});

const pathFile = path.join(__dirname, 'assets');
const pathCopyFile = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir(pathCopyFile, { recursive: true }, (error) => {
  if (error) {
    console.log(error);
  }
});

fs.readdir(pathFile, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error);
  else
    files.forEach((file) => {
      if (file.isDirectory()) {
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', file.name),
          { recursive: true },
          (error) => {
            if (error) {
              console.log(error);
            }
          },
        );

        fs.readdir(
          path.join(__dirname, 'assets', file.name),
          { withFileTypes: true },
          (error, items) => {
            if (error) console.log(error);
            else {
              items.forEach((item) => {
                const pathItemFrom = path.join(
                  __dirname,
                  'assets',
                  file.name,
                  item.name,
                );
                const pathItemCopy = path.join(
                  __dirname,
                  'project-dist',
                  'assets',
                  file.name,
                  item.name,
                );
                fs.copyFile(
                  path.join(pathItemFrom),
                  path.join(pathItemCopy),
                  (error) => {
                    if (error) {
                      console.log(error);
                    }
                  },
                );
              });
            }
          },
        );
      } else if (file.isFile()) {
        fs.copyFile(
          path.join(pathFile, file.name),
          path.join(pathCopyFile, file.name),
          (error) => {
            if (error) {
              console.log(error);
            }
          },
        );
      }
    });
});
