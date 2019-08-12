import { log } from './utils/logging'
import settings from './settings/settings'
import { container, image, inspect } from './docker'
import Optional from './utils/optional'

let containers = container.ls('-a');
containers.forEach(_container => _container["running"] = _container.isRunning())
let images = image.ls();


const ids = containers.reduce((previous, current) => previous + `${current.id} `, '');
let status = inspect.inspectList(ids, true);

console.log(containers);
console.log(images);
console.log(status);

