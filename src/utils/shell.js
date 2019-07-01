import * as shell from 'shelljs'

const PREVIOUS_PATH = '-';

export function execute(command, action, args = undefined, exitOnError = true) {
    const _command = buildCommand(command, action, args);
    const output = shell.exec(_command, { silent: true });

    if (exitOnError && output.code !== 0) {
        throw new Error(`(${output.code}): ${output.stdout}`);
    }

    return output.stdout;
}
export function executeInPath(path, command, action, args = undefined, exitOnError = true) {
    shell.cd(path);
    response = execute(command, action, args, exitOnError);
    shell.cd(PREVIOUS_PATH);
    return response;
}

function buildCommand(command, action, args = undefined) {

    return `docker ${command} ${action} ${args || ''}`;

}

