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

const colors = require('colors');

module.exports.makeAsk = ({ readline }) => (question, options) => new Promise((resolve) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let output = colors.bold(`  ? ${question} `);

  if (options.help) {
    output += colors.gray(`[${options.help}] `);
  } else if (options.default) {
    output += colors.gray(`(${options.default}) `);
  }

  rl.question(output, (answer) => {
    rl.close();
    if (answer.trim() === '') {
      resolve(options.default || answer);
    }

    resolve(answer);
  });
});
