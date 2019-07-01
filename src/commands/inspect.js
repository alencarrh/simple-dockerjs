import * as shell from '../utils/shell'
const logging = require('../utils/logging').forModule('inspect')

const BASE_COMMAND = 'inspect';
const FORMAT = `--format '{{.State.Running}}`;

class Inspect {

    constructor(running) {
        this.running = running;
    }

    isRunning() {
        return this.running;
    }

    static from(output) {
        return new Inspect(JSON.parse(output));
    }
}

function inspect(id_or_name, one = false) {
    logging.info(`[inspect] inspecting id|name='${id_or_name}'`);
    return shell.execute(BASE_COMMAND, '', `${FORMAT} ${id_or_name}`).replace(/'/g, '');
}

export function inspectOne(id_or_name) {
    return Inspect.from(inspect(id_or_name, true));
}

export function inspectList(id_or_name) {
    return inspect(id_or_name)
        .split('\n')
        .filter(r => !!r)
        .map(r => Inspect.from(r));
}