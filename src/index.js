#!/usr/bin/env node

/**
 * Copyright (C) 2017  Noah Loomans
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
