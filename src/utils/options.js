import * as commandLineArgs from 'command-line-args'
import * as log from './logging'

const logging = log.forModule('options');

const optionDefinitions = [
  { key: 'logLevel', name: 'log-level', alias: 'l', type: log.type, defaultValue: log.levels.INFO }
]

const args = commandLineArgs(optionDefinitions);
const options = {};
optionDefinitions.forEach(option => options[option.key] = args[option.name]);

log.set(options.logLevel);
logging.debug('execution with options:', JSON.stringify(options));

module.exports = options