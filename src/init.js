const path = require('path');

const makeInit = ({ git, ask, status }) => async () => {
  if (!git.isInstalled()) {
    status(Error('Git is not installed'), true);
    status(Error('Please install git to continue'), false);
    process.exit(1);
  }

  if (!git.isInGitRepo()) {
    status(Error('Not in the root of a git repo'), true);
    status(Error('Please keep in mind that you need to be in the root of the git repo.'));
    status(Error('So if ~/robot-project is your repo, you cain\'t be in ~/robot-project/src'));
    process.exit(1);
  }

  const projectName = await ask('Project Name', path.basename(process.cwd()));

  if (projectName.includes('/')) {
    status(Error('Your project name can not contain a /'), true);
    process.exit(1);
  }

  status('Checking status of current git repo...');

  if (git.isSetup()) {
    status('Git repo is already setup, skipping...', true);
  } else {
    try {
      await git.addRemote({ projectName });
    } catch (e) {
      status('Something went wrong while executing a git command, this is what I got:', true);
      status(e);
      // console.error(e);
    }
  }

  console.log(projectName);
};

module.exports = { makeInit };
