#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const deployDir = path.join(rootDir, 'deploy');

// deploy 폴더 생성 (이미 있으면 삭제 후 재생성)
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

console.log('📦 Creating deployment package...\n');

// 복사할 항목들
const itemsToCopy = [
  { src: 'manifest.json', dest: 'manifest.json', required: true },
  { src: 'dist', dest: 'dist', required: true },
  { src: 'public', dest: 'public', required: false },
  { src: 'icons', dest: 'icons', required: false },
];

// 파일/폴더 복사 함수
function copyRecursive(src, dest) {
  const srcPath = path.join(rootDir, src);
  const destPath = path.join(deployDir, dest);

  if (!fs.existsSync(srcPath)) {
    return false;
  }

  const stat = fs.statSync(srcPath);

  if (stat.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    const items = fs.readdirSync(srcPath);
    items.forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(srcPath, destPath);
  }

  return true;
}

// 항목들 복사
let hasError = false;
itemsToCopy.forEach(({ src, dest, required }) => {
  const success = copyRecursive(src, dest);

  if (success) {
    console.log(`✓ Copied ${src}`);
  } else if (required) {
    console.error(`✗ Required file/folder not found: ${src}`);
    hasError = true;
  } else {
    console.log(`⊘ Skipped ${src} (not found)`);
  }
});

if (hasError) {
  console.error('\n❌ Deployment failed: Missing required files');
  process.exit(1);
}

console.log(`\n✅ Deployment package created at: ${deployDir}`);
console.log('\nYou can now load the extension from the deploy folder:');
console.log('1. Open chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked"');
console.log(`4. Select the "deploy" folder\n`);
