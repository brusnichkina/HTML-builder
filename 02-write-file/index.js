const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdout, stdin } = process;
const pathToFile = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(pathToFile, 'utf-8');

const goOutOfHere = () => {
  stdout.write('Bye-bye!');
  process.exit();
};

stdout.write('Hello! Write your text here: \n');

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('SIGINT', () => goOutOfHere());
rl.on('line', (text) => {
  if (text.toString().includes('exit')) {
    goOutOfHere();
  }
  writeStream.write(`${text}\n`);
});
