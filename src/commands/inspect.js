import shell from '../utils/shell'
import { EMPTY_LIST, EMPTY_RESULT } from '../utils/constants'
import log from '../utils/logging'
import Optional from '../utils/optional';

const BASE_COMMAND = 'inspect';
const FORMAT = `--format '{{.State.Running}}'`;
const logging = log.forModule(BASE_COMMAND)

class Inspect {

    constructor(id, running) {
        this.id = id;
        this.running = running;
    }

    isRunning() {
        return this.running;
    }

    static from(id, output) {
        return new Inspect(id, JSON.parse(output));
    }
}

function _inspect(id) {
    logging.info(`[inspect] inspecting id|name='${id}'`);
    return shell.execute(BASE_COMMAND, '', `${FORMAT} ${id}`).replace(/'|\n/g, '');
}

export function inspect(id) {
    return Optional.of(id)
        .map(_id => _inspect(_id))
        .map(_result => Inspect.from(id, _result))
        .orElse(EMPTY_RESULT);
}

export function inspectList(ids, fromString = false, delimiter = ' ') {
    return Optional.of(ids)
        .map(_ids => fromString ? _ids.split(delimiter) : _ids)
        .orElse(EMPTY_LIST)
        .map(_id => inspect(_id))
        .filter(r => !!r);
}