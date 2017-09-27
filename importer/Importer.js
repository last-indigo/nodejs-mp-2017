module.exports = class Importer {
  constructor(DirWatcher) {
    this.DirWatcher = DirWatcher;

    /*
      It should be able to listen to DirWatcher events
      and start import csv files on 'dirwatcher:changed' event.
    */
    this.DirWatcher.dirwatcherEmitter.on('dirwatcher:changed', (pathChanged) => {
      // if (err) { }
      console.log(`
      dirwatcher:changed ${pathChanged}
      `);

      // async...
      this.import(pathChanged)
        .then((fileContent) => {
          this.onImportedAsync(fileContent);
        });

      // sync...
      const syncFileContent = this.importSync(pathChanged);
      this.onImportedSync(syncFileContent);
    });
  }

  import(path) {
    // The first method should be able to return promise with imported data.
    console.log('import() called for:' + path);

    return new Promise((resolve, reject) => {
      // TODO: fs.readFile
      const importedFileContent = `[${path}] = import() importedFileContent`;  // TODO:
      resolve(importedFileContent);
    });
  }

  importSync(path) {
    // The second method is synchronous and should be able to return all imported data.
    console.log('importSync() called for:' + path);

    // TODO: fs.readFileSync
    const importedFileContent = `[${path}] = importSync() result`;
    return importedFileContent;
  }

  onImportedAsync(fileContent) {
    console.log(`[Async] ${fileContent}`);
  }

  onImportedSync(fileContent) {
    console.log(`[sync] ${fileContent}`);
  }
}
