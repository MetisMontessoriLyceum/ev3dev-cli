const readline = require('readline');
const colors = require('colors');

const ask = (question, default_) => new Promise((resolve) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let output = colors.bold(`${question} `);

  if (default_) {
    output += colors.gray(`(${default_}) `);
  }

  rl.question(output, (answer) => {
    rl.close();
    resolve(answer);
  });
});

ask('hi there', 'pizza').then((answer) => { console.log(`you said ${answer}`); });
