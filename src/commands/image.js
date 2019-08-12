import shell from '../utils/shell'
import log from '../utils/logging'

const BASE_COMMAND = 'image';
const DELIMITER = '#';
const FORMAT = `--format '{{.ID}}${DELIMITER}{{.Repository}}${DELIMITER}{{.Tag}}'`;

const logging = log.forModule(BASE_COMMAND)

class Image {

    constructor(imageId, repository, tag) {
        this.imageId = imageId;
        this.repository = repository;
        this.tag = tag;
    }

    static from(text) {
        const values = text.split(DELIMITER);
        return new Image(values[0], values[1], values[2] || '');
    }
}

export function ls(args) {
    logging.info(`[ls] listing images. args=[${args || ''}]`)
    return shell.execute(BASE_COMMAND, 'ls', `${FORMAT} ${args || ''}`)
        .replace(/'/g, '')
        .split('\n')
        .filter(r => !!r)
        .map(r => Image.from(r));
}