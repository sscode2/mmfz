const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Natalify deployment readiness...\n');

// Function to check if a file exists
function checkFileExists(filePath) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${filePath}`);
  return exists;
}

// Function to check if a directory exists
function checkDirExists(dirPath) {
  const fullPath = path.join(__dirname, dirPath);
  const exists = fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory();
  console.log(`${exists ? '✅' : '❌'} ${dirPath}/`);
  return exists;
}

// Required directories
const requiredDirs = [
  'natalify-frontend',
  'natalify-backend',
  'natalify-frontend/netlify/functions'
];

// Required files
const requiredFiles = [
  'natalify-frontend/package.json',
  'natalify-frontend/vite.config.js',
  'natalify-frontend/index.html',
  'natalify-frontend/netlify.toml',
  'natalify-frontend/netlify/functions/api.js',
  'natalify-frontend/netlify/functions/package.json',
  'README.md',
  'DEPLOYMENT-GUIDE.md',
  'DEPLOYMENT-SUMMARY.md'
];

// Check directories
console.log('📁 Checking required directories:');
let allDirsExist = true;
for (const dir of requiredDirs) {
  if (!checkDirExists(dir)) {
    allDirsExist = false;
  }
}

console.log('');

// Check files
console.log('📄 Checking required files:');
let allFilesExist = true;
for (const file of requiredFiles) {
  if (!checkFileExists(file)) {
    allFilesExist = false;
  }
}

console.log('');

// Final result
if (allDirsExist && allFilesExist) {
  console.log('🎉 All required files and directories are present!');
  console.log('🚀 Ready for Netlify deployment');
  process.exit(0);
} else {
  console.log('❌ Some required files or directories are missing');
  process.exit(1);
}