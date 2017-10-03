const strings = require('../strings');

module.exports.makeUpload = ({
  status,
  readConfig,
  cwd,
  exit,
  spawn,
}) => () => {
  let config;
  try {
    config = readConfig();
  } catch (e) {
    status(strings.error.yamlNotThere);
    exit(1);
  }

  let options = ['-r', '-v', '--rsh=ssh', '--delete', '--delete-excluded'];
  if (config.project.ignore) {
    options = options.concat(config.project.ignore.map(ignoreRule => `--exclude=${ignoreRule}`));
  }
  options.push(`${cwd()}/.`);
  options.push(`localhost:${config.project.name}`);
  const rsync = spawn('rsync', options);

  rsync.stdout.on('data', data => process.stdout.write(data));
  rsync.stderr.on('data', data => process.stderr.write(data));
  rsync.on('close', exit);
};
