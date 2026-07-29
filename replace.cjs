const fs = require('fs');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = dir + '/' + file;
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('src/components');
files.push('src/pages/Home.jsx');
files.push('src/App.jsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-white/g, 'text-text-main');
  content = content.replace(/bg-white/g, 'bg-text-main');
  content = content.replace(/border-white/g, 'border-text-main');
  content = content.replace(/bg-black\/20/g, 'bg-text-main/10');
  content = content.replace(/bg-black\/10/g, 'bg-text-main/5');
  fs.writeFileSync(file, content);
});
console.log('Done');
