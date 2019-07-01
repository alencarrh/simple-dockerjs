import { container, image, inspect } from './docker'


let containers = container.ls();
//let containers = container.ls('-a');
console.log(containers);

