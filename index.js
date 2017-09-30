const commandLineCommands = require('command-line-commands');
const { spawn } = require('child_process');
const commandExistsSync = require('command-exists').sync;
const readline = require('readline');

const gitFactory = require('./src/git');

const git = {
  isInstalled: gitFactory.makeIsInstalled({ commandExistsSync }),
  isInGitRepo: gitFactory.makeIsInRepo({ spawn }),
};

const ask = require('./src/ask').makeAsk({ readline });

const init = require('./src/init').makeInit({ git, ask });

const main = require('./src/index').makeMain({
  commandLineCommands,
  init,
});

main();
