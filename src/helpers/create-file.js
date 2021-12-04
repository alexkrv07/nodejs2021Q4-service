// const { open } = require('fs/promises');
const fs = require('fs/promises');
const path = require('path');

const createFile = async (fileName, content) => {
  const pathToFile = path.join(__dirname, fileName);

  let filehandle;
  try {
    // filehandle = await open(pathToFile, "r");
    // await filehandle.writeFile(content, 'utf8');
    await fs.writeFile(pathToFile, content);
  } finally {
    await filehandle?.close();
  }
}

module.exports = { createFile };

// const fs = require('fs').promises;

// This must run inside a function marked `async`:
// const file = await fs.readFile('filename.txt', 'utf8');
// await fs.writeFile('filename.txt', 'test');
