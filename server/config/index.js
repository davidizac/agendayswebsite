let config;

let env = process.env.NODE_ENV;
if (!env) env = 'dev';

console.log(`Using ${env} configuration`);
config = require('./' + env);


module.exports = config;