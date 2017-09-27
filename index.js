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

const path = require('path');
const dirNameCSVFiles = './data/';

let pathsToWatch = [
  path.resolve(__dirname, dirNameCSVFiles),
];
pathsToWatch.forEach((pathBeingWatched) => {
  let delay = 1000;
  dirwatcherInstance.watch(pathBeingWatched, delay);
});
