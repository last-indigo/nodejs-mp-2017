module.exports = class DirWatcher {
  constructor(dirwatcherEmitter) {
    this.dirwatcherEmitter = dirwatcherEmitter;
  }

  watch(path, delay) {
    // TODO: fs.watch -> then emit
    setTimeout(() => {
      this.dirwatcherEmitter.emit('dirwatcher:changed', path);
    }, delay);
  }
}
