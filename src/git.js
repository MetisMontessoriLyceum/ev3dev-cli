const makeIsInstalled = ({ commandExistsSync }) => () => commandExistsSync('git');

const makeIsInRepo = ({ spawn }) => () => new Promise((resolve) => {
  const git = spawn('git', ['status']);

  git.stdout.on('data', () => {
    resolve(true);
  });

  git.stderr.on('data', () => {
    resolve(false);
  });
});

module.exports = { makeIsInstalled, makeIsInRepo };
