const config = require('./config/server-app-config');
console.log(config.name);

const models = require('./models');

new models.User();
new models.Product();

const EventEmitter = require('events');
const DirWatcher = require('./dirwatcher/DirWatcher');
const Importer = require('./importer/Importer');

const dirwatcherEmitter = new EventEmitter();
const dirwatcherInstance = new DirWatcher(dirwatcherEmitter);
const importerInstance = new Importer(dirwatcherInstance);

let pathsToWatch = [
  'path1',
  'path2',
  'path3',
];
pathsToWatch.forEach((pathBeingWatched) => {
  let delay = 1000;
  dirwatcherInstance.watch(pathBeingWatched, delay);
});
