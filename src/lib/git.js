const path = require('path');

module.exports.makeIsGitInstalled = ({ commandExistsSync }) => () =>
  commandExistsSync('git');

module.exports.makeIsInGitRepo = ({ fs, cwd }) => () =>
  fs.existsSync(path.join(cwd(), '.git'));

module.exports.makeIsGitRemoteSetup = ({ fs, cwd }) => () => {
  const gitConfig = fs.readFileSync(path.join(cwd(), '.git/config'), 'utf-8');

  return /^\[remote "ev3dev"\]$/m.test(gitConfig);
};

module.exports.makeAddGitRemote = ({ spawn }) => ({ projectName }) =>
  new Promise((resolve, reject) => {
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

module.exports.makeRemoveGitRemote = ({ spawn }) => () => new Promise((resolve, reject) => {
  const git = spawn('git', ['remote', 'rm', 'ev3dev']);

  git.stderr.on('data', reject);

  git.on('close', (code) => {
    if (code !== 0) {
      // It's save to call reject multiple times.
      reject();
    }

    resolve();
  });
});
