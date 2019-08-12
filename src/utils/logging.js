import chalk from 'chalk'
import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import settings from '../settings/settings'
import Optional from './optional'

prefix.reg(loglevel);

const colors = {
    TRACE: chalk.magenta,
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
};

const LEVELS = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    SILENT: 'silent',
    TRACE: 'trace',
    WARN: 'warn'
};

const knownLevels = [
    LEVELS.DEBUG,
    LEVELS.ERROR,
    LEVELS.INFO,
    LEVELS.SILENT,
    LEVELS.TRACE,
    LEVELS.WARN
];

prefix.apply(loglevel, {
    format(level, name, timestamp) {
        return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
    },
});

let level = settings.log.defaultLevel;
loglevel.name = settings.log.rootName;
type(level)
loglevel.setLevel(level)

export { LEVELS as levels };
export { loglevel as log };

export function set(newLevel) {
    level = newLevel;
    loglevel.setLevel(newLevel);
}

export function type(value) {
    Optional.of(knownLevels.find(kl => kl === value))
        .orError(`The valid log-levels are [${knownLevels.join(', ')}]`);
}

export function forModule(module) {
    let moduleLog = loglevel.getLogger(module);
    moduleLog.setLevel(level);
    prefix.apply(moduleLog, {
        format(level, name, timestamp) {
            return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
        },
    });
    return moduleLog;
}

export default { forModule }