import { spawn } from 'child_process';

const regex = /(?<file>[^:]+):(?<line>\d+):(?<column>\d+)\s-\s+(?<message>.+)/;
const fileList = (process.env.CHANGED_FILES || '').split(' ');

const cspell = spawn('npx', ['cspell', 'stdin'], { stdio: ['pipe', 'pipe', 'inherit'] });
cspell.stdin.write(fileList.join('\n'));
cspell.stdin.end();

cspell.stdout.on('data', (data) => {
  console.log(data.toString());
  data
    .toString()
    .split('\n')
    .forEach((line) => {
      const match = line.match(regex);
      if (match) {
        const { line, message } = match.groups;
        console.log(`::error file=${fileList[line - 1]},line=1,column=1::${message}`);
      }
    });
});

cspell.on('exit', process.exit);
