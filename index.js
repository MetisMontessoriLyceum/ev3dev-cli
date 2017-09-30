const commandLineCommands = require('command-line-commands');
const { spawn } = require('child_process');
const fs = require('fs');
const commandExistsSync = require('command-exists').sync;
const readline = require('readline');

const status = require('./src/status');

status('version: v0.0.1');

const gitFactory = require('./src/git');

const git = {
  isInstalled: gitFactory.makeIsInstalled({ commandExistsSync }),
  isInGitRepo: gitFactory.makeIsInRepo({ fs, cwd: process.cwd }),
  isSetup: gitFactory.makeIsSetup({ fs, cwd: process.cwd }),
  addRemote: gitFactory.makeAddRemote({ spawn }),
  removeRemote: gitFactory.makeRemoveRemote({ spawn }),
};

const ask = require('./src/ask').makeAsk({ readline });

const readConfig = require('./src/config').makeReadConfig({ fs, cwd: process.cwd });
const writeConfig = require('./src/config').makeWriteConfig({ fs, cwd: process.cwd });

const getProjectName = require('./src/config').makeGetProjectName({
  status, ask, readConfig, writeConfig,
});

const initRepo = require('./src/init').makeInitRepo({
  git,
  status,
  ask,
  getProjectName,
});

const main = require('./src/index').makeMain({
  commandLineCommands,
  status,
  initRepo,
});

main();
