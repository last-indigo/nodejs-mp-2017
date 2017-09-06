const config = require('./config/server-app-config');
console.log(config.name);

const models = require('./models');

new models.User();
new models.Product();