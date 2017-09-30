const makeInitRepo = ({
  git,
  status,
  ask,
  getProjectName,
}) => async () => {
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

  const projectName = await getProjectName();

  status('Checking status of current git repo...');

  if (git.isSetup()) {
    status(Error('The remote `ev3dev` has already been added to this git repository'), true);
    // eslint-disable-next-line no-underscore-dangle
    const continue_ = await ask('Continue anyway?', { help: 'Y/n', default: 'y' });
    if (continue_.toLowerCase() === 'n' || continue_.toLowerCase() === 'no') {
      process.exit(0);
    }

    status('Removing the remote `ev3dev` from the git repository...');
    await git.removeRemote();
  }

  try {
    status('Adding the remote `ev3dev` from the git repository...', true);
    await git.addRemote({ projectName });
  } catch (e) {
    status(Error('Something went wrong while executing a git command, this is what I got:'), true);
    status(Error(e));
    process.exit(1);
  }
};

module.exports = { makeInitRepo };
