const commandLineUsage = require('command-line-usage');

const printHelp = () => {
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
};

const makeMain = ({ commandLineCommands, init }) => () => {
  const { command } = commandLineCommands([null, 'init', 'help']);

  switch (command) {
    case 'init':
      init();
      break;
    case 'help':
    default:
      printHelp();
  }
};

module.exports = { makeMain };
