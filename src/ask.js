const colors = require('colors');

const makeAsk = ({ readline }) => (question, options) => new Promise((resolve) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let output = colors.bold(`  ? ${question} `);

  if (options.help) {
    output += colors.gray(`[${options.help}] `);
  } else if (options.default) {
    output += colors.gray(`(${options.default}) `);
  }

  rl.question(output, (answer) => {
    rl.close();
    if (answer.trim() === '') {
      resolve(options.default || answer);
    }

    resolve(answer);
  });
});

module.exports = { makeAsk };
