module.exports = {
  error: {
    gitIsNotInstalled: [
      { text: 'Git is not installed', error: true, important: true },
      { text: 'Please install git to continue', error: true },
    ],
    notInGitRepo: [
      { text: 'Not in the root of a git repo', error: true, important: true },
      { text: 'Please keep in mind that you need to be in the root of the git repo.', error: true },
      { text: 'So if ~/robot-project is your repo, you cain\'t be in ~/robot-project/src', error: true },
    ],
    remoteAlreadyThere: { text: 'The remote `ev3dev` has already been added to this git repository', error: true, important: true },
    unknownGitError: { text: 'Something went wrong while executing a git command, this is what I got:', error: true, important: true },
    yamlMalformed: { text: 'ev3dev.yml is malformed', error: true },
    yamlMalformedReason: { projectName: { text: 'project.name is not a string', error: true } },
    commandNotRecognized: command => ({ text: `Command \`${command}\` not recognized.`, error: true, important: true }),
    yalmNotThere: { text: 'Unable to open ev3dev.yml', error: true, important: true },
  },
  info: {
    version: { text: 'version: v0.0.1' },
    usingYaml: { text: 'Using ev3dev.yml', important: true },
    checkingRepoStatus: { text: 'Checking status of current git repo...' },
    removingRemote: { text: 'Removing the remote `ev3dev` from the git repository...' },
    addingRemote: { text: 'Adding the remote `ev3dev` from the git repository...' },
  },
};
