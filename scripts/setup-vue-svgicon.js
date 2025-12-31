const fs = require('fs');
const path = require('path');

// Create vue-svgicon module directory
const moduleDir = path.join(__dirname, '../node_modules/vue-svgicon');
if (!fs.existsSync(moduleDir)) {
  fs.mkdirSync(moduleDir, { recursive: true });
}

// Create package.json
const packageJson = {
  name: 'vue-svgicon',
  version: '1.0.0',
  main: 'index.js',
  type: 'module'
};
fs.writeFileSync(
  path.join(moduleDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Create index.js that re-exports from the actual bridge
const bridgePath = path.join(__dirname, '../src/utils/vue-svgicon-bridge.js');
const relativeBridgePath = path.relative(moduleDir, bridgePath).replace(/\\/g, '/');

const indexJs = `// Bridge module for vue-svgicon compatibility
// This re-exports from the actual bridge module
export { default } from '${relativeBridgePath}';
`;
fs.writeFileSync(path.join(moduleDir, 'index.js'), indexJs);

console.log('✓ vue-svgicon bridge module created');
