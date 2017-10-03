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

// lib/status.js
const status = require('./lib/status');

// lib/config.js
const readConfig = require('./lib/config').makeReadConfig({
  fs,
  cwd: process.cwd,
  exit: process.exit,
});

// routes/upload.js
const upload = require('./routes/upload').makeUpload({
  status,
  readConfig,
  cwd: process.cwd,
  exit: process.exit,
  spawn,
});

// router.js
const router = require('./router').makeRouter({
  commandLineCommands,
  status,
  upload,
});

router();
