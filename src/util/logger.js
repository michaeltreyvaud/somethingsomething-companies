module.exports = {
  debug: text => console.debug(JSON.stringify(text)),
  info: text => console.info(JSON.stringify(text)),
  warn: text => console.warn(JSON.stringify(text)),
  error: text => console.error(JSON.stringify(text)),
};
