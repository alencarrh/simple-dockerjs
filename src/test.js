import { log } from './utils/logging'
import settings from './settings/settings'
import { container, image, inspect } from './docker'
import Optional from './utils/optional'

let containers = container.ls('-a');
containers.forEach(_container => _container["running"] = _container.isRunning())
console.log(containers);

let images = image.ls();
console.log(images);

const ids = containers.reduce((previous, current) => previous + `${current.id} `, '');
//console.log(ids);
let status = inspect.inspectList(ids, true);
console.log(log);
console.log(log.info)
console.log(log.getLevel())
//log.warn(`status: ${status}`)


console.log(settings);

//console.log("status", status);
