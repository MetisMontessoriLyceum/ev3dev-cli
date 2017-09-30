const path = require('path');

const makeIsInstalled = ({ commandExistsSync }) => () => commandExistsSync('git');

const makeIsInRepo = ({ fs, cwd }) => () =>
  fs.existsSync(path.join(cwd(), '.git'));

const makeIsSetup = ({ fs, cwd }) => () => {
  const gitConfig = fs.readFileSync(path.join(cwd(), '.git/config')).toString('utf-8');

  console.log(gitConfig);

  return /^\[remote "ev3dev"\]$/m.test(gitConfig);
};

const makeAddRemote = ({ spawn }) => ({ projectName }) => new Promise((resolve, reject) => {
  // We have already checked that projectName does not contain a slash.
  const git = spawn('git', ['remote', 'add', 'ev3dev', `robot@ev3dev.local:${projectName}`]);

  git.stderr.on('data', reject);

  git.on('close', (code) => {
    if (code !== 0) {
      // It's save to call reject multiple times.
      reject();
    }

    resolve();
  });
});

module.exports = {
  makeIsInstalled,
  makeIsInRepo,
  makeIsSetup,
  makeAddRemote,
};
