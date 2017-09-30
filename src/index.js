const commandLineCommands = require('command-line-commands');
const { spawn } = require('child_process');
const fs = require('fs');
const commandExistsSync = require('command-exists').sync;
const readline = require('readline');

// lib/status.js
const status = require('./lib/status');

// lib/git.js
const gitFactory = require('./lib/git');

const isGitInstalled = gitFactory.makeIsGitInstalled({ commandExistsSync });
const isInGitRepo = gitFactory.makeIsInGitRepo({ fs, cwd: process.cwd });
const isGitRemoteSetup = gitFactory.makeIsGitRemoteSetup({ fs, cwd: process.cwd });
const addGitRemote = gitFactory.makeAddGitRemote({ spawn });
const removeGitRemote = gitFactory.makeRemoveGitRemote({ spawn });

// lib/ask.js
const ask = require('./lib/ask').makeAsk({ readline });

// lib/config.js
const readConfig = require('./lib/config').makeReadConfig({
  fs,
  cwd: process.cwd,
  exit: process.exit,
});

const writeConfig = require('./lib/config').makeWriteConfig({
  fs,
  cwd: process.cwd,
  exit: process.exit,
});

const getProjectName = require('./lib/config').makeGetProjectName({
  status,
  ask,
  readConfig,
  writeConfig,
});

// routes/init.js
const initRepo = require('./routes/init').makeInitRepo({
  isGitInstalled,
  isInGitRepo,
  isGitRemoteSetup,
  addGitRemote,
  removeGitRemote,
  status,
  ask,
  getProjectName,
  exit: process.exit,
});

// router.js
const router = require('./router').makeRouter({
  commandLineCommands,
  status,
  initRepo,
});

router();
