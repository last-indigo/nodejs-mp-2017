const fs = require('fs');
const PATH = require('path');

module.exports = class Importer {
  constructor(DirWatcher) {
    this.DirWatcher = DirWatcher;

    this.attachEvents();
  }

  attachEvents() {
    /**
     * It should be able to listen to DirWatcher events
     * and start import csv files on 'dirwatcher:changed' event.
     */
    this.DirWatcher.dirwatcherEmitter.on('dirwatcher:changed', (absPathChanged) => {
      this.onDirWatcherChanged(absPathChanged);
    });
  }

  onDirWatcherChanged(absPathChanged) {
    console.log(`
      dirwatcher:changed ${absPathChanged}
      `);

    // async...
    this.import(absPathChanged)
      .then((fileContent) => {
        this.onImportedAsync(fileContent);
      });

    // sync...
    const syncFileContent = this.importSync(absPathChanged);
    this.onImportedSync(syncFileContent);
  }

  /**
   * The first method should be able to return promise with imported data.
   * @returns {Promise<String>}
   */
  async import(absPath) {
    console.log('import() called for:' + absPath);

    const importedFileContent = await new Promise((resolve, reject) => {
      fs.readFile(absPath, (err, importedFileContent) => {
        if (err) {
          console.error('error reading file', err);
          return;
        }
        console.log('[Async] import() fs.readFile success');

        resolve(importedFileContent);
      });
    });

    return importedFileContent;
  }

  /**
   * The second method is synchronous and should be able to return all imported data.
   * @returns {String}
   */
  importSync(absPath) {
    console.log('importSync() called for:' + absPath);

    try {
      const importedFileContent = fs.readFileSync(absPath);
      console.log('[sync] importSync() fs.readFileSync success');

      return importedFileContent;
    } catch (e) { }
  }

  onImportedAsync(fileContent) {
    console.log(`[Async] ${fileContent}`);
  }

  onImportedSync(fileContent) {
    console.log(`[sync] ${fileContent}`);
  }
}
