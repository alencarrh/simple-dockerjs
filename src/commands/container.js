import * as shell from '../utils/shell'
import * as inspect from './inspect'
const logging = require('../utils/logging').forModule('container')

const BASE_COMMAND = 'container';
const DELIMITER = '#';
const FORMAT = `--format '{{.ID}}${DELIMITER}{{.Names}}${DELIMITER}{{.Image}}${DELIMITER}{{.Ports}}'`;

class Container {

    constructor(id, names, image, ports) {
        this.id = id;
        this.names = names;
        this.image = image;
        this.ports = ports;
    }

    isRunning() {
        return inspect.inspect(this.id).status.isRunning();
    }

    static from(text) {
        // #review: checkout why we have a ' character in the begging and in the end of the string
        let values = text.substr(1).slice(0, -1).split(DELIMITER);
        return new Container(values[0], values[1], values[2], values[3] || '');
    }
}

export function ls(args) {
    logging.info(`[ls] listing containers. args=[${args || ''}]`)
    return shell.execute(BASE_COMMAND, 'ls', `${FORMAT} ${args || ''}`)
        .split('\n')
        .filter(r => !!r)
        .map(r => Container.from(r));
}