import * as shell from 'shelljs'
import * as log from './logging'

const logging = log.forModule('shell');

const PREVIOUS_PATH = '-';

export function execute(command, action, args = undefined, exitOnError = true) {
    const _command = buildCommand(command, action, args);
    logging.debug(`executing command: ${_command}`)
    const output = shell.exec(_command, { silent: true });

    if (exitOnError && output.code !== 0) {
        throw new Error(`(${output.code}): ${output.stdout}`);
    }

    return output.stdout;
}
export function executeInPath(path, command, action, args = undefined, exitOnError = true) {
    cd(path);
    response = execute(command, action, args, exitOnError);
    cd(PREVIOUS_PATH);
    return response;
}

function buildCommand(command, action, args = undefined) {
    return `docker ${command} ${action} ${args || ''}`;
}

function cd(path) {
    logging.debug(`changing path to: ${path}`)
    shell.cd(path);
}

