const colors = require('colors');

const status = (text_, isImportant) => {
  const isError = text_ instanceof Error;

  let text;
  if (isError) {
    text = text_.message;
  } else {
    text = text_;
  }

  let message = '';

  if (isImportant) {
    message += '==> ';
  } else {
    message += '    ';
  }

  message += text;

  if (isError) {
    message = colors.red(message);
  }

  if (isImportant) {
    message = colors.bold(message);
  }

  console.log(message);
};

module.exports = status;
