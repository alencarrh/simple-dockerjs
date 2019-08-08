import * as shell from '../utils/shell'
import * as log from '../utils/logging'
import Optional from '../utils/optional';

const BASE_COMMAND = 'inspect';
const FORMAT = `--format '{{.State.Running}}`;
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
        .map((_id) => _inspect(_id))
        .map((_result) => Inspect.from(_result))
        .orError("Inspect command requires an id.");
}

export function inspectList(ids, listFromString = false, separator = ' ') {
    return Optional.of(ids)
        .map((_ids) => listFromString ? _ids.split(separator) : _ids)
        .orError(`InspectList expected a list of IDs but received: '${ids}'`)
        .filter((_id) => !!_id)
        .map((_id) => inspect(_id));
}