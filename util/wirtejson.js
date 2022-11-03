const fs = require('fs');

module.exports = (json, fileName) => {
  if (process.env.WRITEJSON === 'N') return;
  const exists = fs.existsSync('./debugtext');
  if (!exists) {
    fs.mkdirSync('./debugtext');
  }

  fs.writeFileSync(`./debugtext/${fileName}.json`, JSON.stringify(json, null, 2));
};
