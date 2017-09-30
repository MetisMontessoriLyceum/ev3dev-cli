const path = require('path');
const yaml = require('js-yaml');

const makeGetProjectName = ({
  status, ask, readConfig, writeConfig,
}) => async () => {
  let projectName;
  try {
    projectName = readConfig().project.name;
    status('Using project name found in ev3dev.yml', true);

    if (typeof projectName !== 'string') {
      status(Error('ev3dev.yml is malformed'), true);
      status(Error('project.name is not a string'));
      process.exit(1);
    }
  } catch (e) {
    projectName = await ask('Project Name', path.basename(process.cwd()));
    status('Saving project name in ev3dev.yml', true);
    writeConfig({ project: { name: projectName } });
  }

  if (projectName.includes('/') || projectName.includes('\0')) {
    status(Error('Your project name can not contain a / or a null byte'), true);
    process.exit(1);
  }

  return projectName;
};

const makeReadConfig = ({ fs, cwd }) => () =>
  yaml.safeLoad(fs.readFileSync(path.join(cwd(), 'ev3dev.yml'), 'utf-8'));

const makeWriteConfig = ({ fs, cwd }) => config =>
  fs.writeFileSync(path.join(cwd(), 'ev3dev.yml'), yaml.safeDump(config));


module.exports = { makeReadConfig, makeWriteConfig, makeGetProjectName };
