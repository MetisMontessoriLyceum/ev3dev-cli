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
};

const makeMain = ({ commandLineCommands, status, initRepo }) => () => {
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
    status(Error(`Command \`${process.argv[2]}\` not recognized.`), true);
    printHelp();
  }
};

module.exports = { makeMain };
