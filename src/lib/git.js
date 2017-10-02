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

const path = require('path');

module.exports.makeIsGitInstalled = ({ commandExistsSync }) => () =>
  commandExistsSync('git');

module.exports.makeIsInGitRepo = ({ fs, cwd }) => () =>
  fs.existsSync(path.join(cwd(), '.git'));

module.exports.makeIsGitRemoteSetup = ({ fs, cwd }) => () => {
  const gitConfig = fs.readFileSync(path.join(cwd(), '.git/config'), 'utf-8');

  return /^\[remote "ev3dev"\]$/m.test(gitConfig);
};

module.exports.makeAddGitRemote = ({ spawn }) => ({ projectName }) =>
  new Promise((resolve, reject) => {
    // We have already checked that projectName does not contain a slash.
    const git = spawn('git', ['remote', 'add', 'ev3dev', `robot@ev3dev.local:${projectName}`]);

    git.stderr.on('data', reject);

    git.on('close', (code) => {
      if (code !== 0) {
        // It's save to call reject multiple times.
        reject();
      }

      resolve();
    });
  });

module.exports.makeRemoveGitRemote = ({ spawn }) => () => new Promise((resolve, reject) => {
  const git = spawn('git', ['remote', 'rm', 'ev3dev']);

  git.stderr.on('data', reject);

  git.on('close', (code) => {
    if (code !== 0) {
      // It's save to call reject multiple times.
      reject();
    }

    resolve();
  });
});
