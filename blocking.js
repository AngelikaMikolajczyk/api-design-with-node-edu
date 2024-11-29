const fs = require('fs');
const path = require('path');

const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');
console.log(result);
