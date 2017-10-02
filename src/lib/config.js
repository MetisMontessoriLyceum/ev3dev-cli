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
const yaml = require('js-yaml');

module.exports.makeGetProjectName = ({
  status,
  ask,
  readConfig,
  writeConfig,
  exit,
}) => async () => {
  let projectName;
  try {
    projectName = readConfig().project.name;
    status('Using project name found in ev3dev.yml', true);

    if (typeof projectName !== 'string') {
      status(Error('ev3dev.yml is malformed'), true);
      status(Error('project.name is not a string'));
      exit(1);
    }
  } catch (e) {
    projectName = await ask('Project Name', { default: path.basename(process.cwd()) });
    status('Saving project name in ev3dev.yml', true);
    writeConfig({ project: { name: projectName } });
  }

  if (projectName.includes('/') || projectName.includes('\0')) {
    status(Error('Your project name can not contain a / or a null byte'), true);
    exit(1);
  }

  return projectName;
};

module.exports.makeReadConfig = ({ fs, cwd }) => () =>
  yaml.safeLoad(fs.readFileSync(path.join(cwd(), 'ev3dev.yml'), 'utf-8'));

module.exports.makeWriteConfig = ({ fs, cwd }) => config =>
  fs.writeFileSync(path.join(cwd(), 'ev3dev.yml'), yaml.safeDump(config));
