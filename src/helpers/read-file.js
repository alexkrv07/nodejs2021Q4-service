// const { open } = require('fs/promises');
// const path = require('path');

// const readfile = async (fileName) => {
//   const pathToFile = path.join(__dirname, fileName);
//   let filehandle;
//   try {
//     filehandle = await open(pathToFile);
//     const content = await filehandle.readFile('utf8');
//     return content;
//   } finally {
//     await filehandle?.close();
//   }
// }

const fs = require("fs");
const path = require('path');

const readfile = (fileName) => {
  const pathToFile = path.join(__dirname, fileName);
  const fileContent = fs.readFileSync(pathToFile, "utf8");
  return fileContent;
}


module.exports = { readfile };
