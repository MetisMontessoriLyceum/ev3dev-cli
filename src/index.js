const commandLineUsage = require('command-line-usage');
const commandLineCommands = require('command-line-commands');

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
          name: 'init',
          description: 'Set up the current git repository and the connected ev3dev robot',
        },
        {
          name: 'help',
          description: 'Print this',
        },
      ],
    },
  ]));
}

const { command } = commandLineCommands([null, 'init', 'help']);

switch (command) {
  case 'init':
    console.log('will be implemented soon');
    break;
  case 'help':
  default:
    printHelp();
}
