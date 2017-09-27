const fs = require('fs');
const PATH = require('path');

module.exports = class DirWatcher {
  constructor(dirwatcherEmitter) {
    this.dirwatcherEmitter = dirwatcherEmitter;

    this.lastChangeDetected = null;
  }

  /**
   * should be able to watch a given path with a given delay
   * and emit an event if directory contents has been changed
   */
  watch(path, delay) {
    fs.watch(path, { recursive: true }, (eventType, filename) => {
      this.lastChangeDetected = setTimeout(() => {
        if (filename) {
          /**
           * Even on supported platforms, filename is not always guaranteed to be provided.
           * Therefore, don't assume that filename argument is always provided in the callback,
           * and have some fallback logic if it is null.
           * https://nodejs.org/docs/latest/api/fs.html#fs_filename_argument
           */
          const absPath = PATH.resolve(path, filename);

          // TODO: emit a single change during delay period
          this.dirwatcherEmitter.emit('dirwatcher:changed', absPath);
        } else {
          console.log('filename not provided');
        }
      }, delay);
    });
  }
}
