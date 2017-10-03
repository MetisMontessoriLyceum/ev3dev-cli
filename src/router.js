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

const strings = require('./strings');
const commandLineUsage = require('command-line-usage');

function printHelp() {
  console.log(commandLineUsage([
    {
      header: 'nloomans\'s ev3dev cli tool',
      content: 'Helps you setup an ev3dev workflow',
    },
    {
      header: 'Command List',
      content: [
        {
          name: 'init-repo',
          description: 'Set up the current git repository',
        },
        {
          name: 'help',
          description: 'Print this',
        },
      ],
    },
  ]));
}

module.exports.makeRouter = ({ commandLineCommands, status, initRepo }) => () => {
  status(strings.info.version);

  try {
    const { command } = commandLineCommands([null, 'init-repo', 'help']);

    switch (command) {
      case 'init-repo':
        initRepo();
        break;
      case 'help':
      default:
        printHelp();
    }
  } catch (e) {
    status(strings.error.commandNotRecognized(process.argv[2]));
    printHelp();
  }
};
