const {toObject} = require('tcomb-doc');
const {writeFileSync} = require('fs');
const {join} = require('path');

function generatePackageDoc(name){
  const pck = require(`../src/${name}.struct`);

  const json = JSON.stringify(toObject(pck.State), null, 2);
  return `
## ${name}

\`\`\`json
${json}
\`\`\`

`;
}

const readme = `#Tcomb Structure

` + ['user', 'streams', 'social'].reduce((memo, name) => {
  return memo + generatePackageDoc(name);
}, '');

const path = join(__dirname, '..', 'DOC.md');

writeFileSync(path, readme);
console.log('documentation generated:');
console.log(path);
console.log(' ');

