const path = require('path');

const makeInit = ({ git, ask }) => async () => {
  if (!git.isInstalled()) {
    console.error('Git is not installed.');
    return;
  }

  if (!await git.isInGitRepo()) {
    console.error('Not in a git repo.');
    return;
  }

  const projectName = await ask('Project Name', path.basename(process.cwd()));

  console.log(projectName);
};

module.exports = { makeInit };
