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

const strings = require('../strings');

module.exports.makeInitRepo = ({
  isGitInstalled,
  isInGitRepo,
  isGitRemoteSetup,
  addGitRemote,
  removeGitRemote,
  status,
  ask,
  getProjectName,
  exit,
}) => async () => {
  if (!isGitInstalled()) {
    status(strings.error.gitIsNotInstalled);
    exit(1);
  }

  if (!isInGitRepo()) {
    status(strings.error.notInGitRepo);
    exit(1);
  }

  const projectName = await getProjectName();

  status(strings.info.checkingRepoStatus);

  if (isGitRemoteSetup()) {
    status(strings.error.remoteAlreadyThere);
    // eslint-disable-next-line no-underscore-dangle
    const continue_ = await ask('Continue anyway?', { help: 'Y/n', default: 'y' });
    if (continue_.toLowerCase() === 'n' || continue_.toLowerCase() === 'no') {
      exit(0);
    }

    status(strings.info.removingRemote);
    await removeGitRemote();
  }

  try {
    status(strings.info.addingRemote);
    await addGitRemote({ projectName });
  } catch (e) {
    status(Error(''), true);
    status(Error(e));
    exit(1);
  }
};
