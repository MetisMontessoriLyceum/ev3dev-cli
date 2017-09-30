const path = require('path');

const makeInit = ({ git, ask, status }) => async () => {
  if (!git.isInstalled()) {
    status(Error('Git is not installed.'), true);
    status(Error('please install git to continu'), false);
    process.exit(1);
  }

  if (!await git.isInGitRepo()) {
    status(Error('Not in a git repo.'), true);
    process.exit(1);
  }

  const projectName = await ask('Project Name', path.basename(process.cwd()));

  console.log(projectName);
};

module.exports = { makeInit };
