import shell from '../utils/shell'
import { BREAK_LINE, EMPTY_LIST } from '../utils/constants'
import log from '../utils/logging'
import Optional from '../utils/optional';

const BASE_COMMAND = 'inspect';
const FORMAT = `--format '{{.State.Running}}'`;
const logging = log.forModule(BASE_COMMAND)

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

function _inspect(id) {
    logging.info(`[inspect] inspecting id|name='${id}'`);
    return shell.execute(BASE_COMMAND, '', `${FORMAT} ${id}`).replace(/'/g, '');
}

export function inspect(id) {
    return Optional.of(id)
        .map(_id => _inspect(_id))
        .map(_result => Inspect.from(_result))
        .orError("either the ID was empty or the command resulted in an empty result");
}

export function inspectList(ids, stringAsList = false) {
    return Optional.of(ids)
        .map(_ids => listAsList ? _ids.join(' ') : _ids)
        .map(_ids => _inspect(_ids))
        .map(result => result.split(BREAK_LINE))
        .orElse(EMPTY_LIST)
        .filter(r => !!r)
        .map((result) => Inspect.from(result));
}