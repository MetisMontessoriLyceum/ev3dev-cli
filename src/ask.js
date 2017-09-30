const colors = require('colors');

const makeAsk = ({ readline }) => (question, default_) => new Promise((resolve) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let output = colors.bold(`  ? ${question} `);

  if (default_) {
    output += colors.gray(`(${default_}) `);
  }

  rl.question(output, (answer) => {
    rl.close();
    if (answer.trim() === '') {
      resolve(default_ || answer);
    }

    resolve(answer);
  });
});

module.exports = { makeAsk };
