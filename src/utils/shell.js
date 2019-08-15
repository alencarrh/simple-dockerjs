import shell from 'shelljs'
import log from './logging'

const logging = log.forModule('shell');

const PREVIOUS_PATH = '-';
const SUCCESS_CODE = 0;

const EXPECTED_ERROR = {
    1: {
        'result': undefined,
        'name': 'EMPTY_RESULT',
        'description': 'command resulted in an empty result',
    }
}

export default { execute, executeInPath }

export function execute(command, action, args = undefined, exitOnError = true) {
    const _command = buildCommand(command, action, args);
    logging.debug(`executing command: ${_command}`)
    const output = shell.exec(_command, { silent: true });

    if (exitOnError && output.code !== SUCCESS_CODE) {
        handleShellError(output);
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

function handleShellError(output) {

    const expectedError = EXPECTED_ERROR[output.code];

    if (!!expectedError) {
        logging.debug(`${expectedError.name}: ${expectedError.description}`);
        return expectedError.result;
    }

    throw new Error(`(${output.code}): ${output.stdout}`);
}