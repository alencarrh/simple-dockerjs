[![view on npm](https://img.shields.io/npm/v/simple-dockerjs.svg)](https://www.npmjs.org/package/simple-dockerjs)
[![npm module downloads](https://img.shields.io/npm/dt/simple-dockerjs.svg)](https://www.npmjs.org/package/simple-dockerjs)
[![dependencies Status](https://david-dm.org/alencarrh/simple-dockerjs/status.svg)](https://david-dm.org/alencarrh/simple-dockerjs)

# simple-dockerjs
Simple DockerJS is suppose to be an simple docker utilitary for to use with javascript.

## Install
```
$ npm install simple-dockerjs --save
```

## Container

To execute _container_ related command, you need to use the _container_ module. You can get the _container_ module like this:

```js
const { container } = require("simple-dockerjs")
```

### ls

List docker containers - used with the `container.ls()` function. 

**USAGE**: `container.ls('-any -param -you -want')`

**DOCKER COMMAND**: `docker container ls -any -param -you -want`

#### Listing containers
```js
const { container } = require("simple-dockerjs")
console.log(container.ls())
```

output:
```
[
  Container {
    id: 'cb7148ae8e4e',
    names: 'some-rabbit',
    image: 'rabbitmq:3',
    ports: '4369/tcp, 5671-5672/tcp, 25672/tcp'
  }
]
```

#### Listing containers with params

```js
const { container } = require("simple-dockerjs")
console.log(container.ls('-a'))
```

output:
```
[
  Container {
    id: 'cb7148ae8e4e',
    names: 'some-rabbit',
    image: 'rabbitmq:3',
    ports: '4369/tcp, 5671-5672/tcp, 25672/tcp'
  },
  Container {
    id: '17f385992a62',
    names: 'some-redis',
    image: 'redis',
    ports: '6379/tcp'
  }
]
```


## Image

To execute _image_ related command, you need to use the _image_ module. You can get the _image_ module like this:

```js
const { image } = require("simple-dockerjs")
```

### ls

List docker image - used with the `image.ls()` function. 

**USAGE**: `image.ls('-any -param -you -want')`

**DOCKER COMMAND**: `docker image ls -any -param -you -want`

### Listing images

```js
const { image } = require("simple-dockerjs")
console.log(image.ls())
```

output:
```
[
  Image { imageId: 'c313149f36a4', repository: 'rabbitmq', tag: '3' },
  Image { imageId: '857c4ab5f029', repository: 'redis', tag: 'latest' }
]
```

#### Listing images with params

```js
const { container } = require("simple-dockerjs")
console.log(container.ls('--filter=reference=redis'))
```

output:
```
[
  Image { imageId: '857c4ab5f029', repository: 'redis', tag: 'latest' }
]
```

## Inspect

To execute _inspect_ related command, you need to use the _inspect_ module. You can get the _inspect_ module like this:

```js
const { inspect } = require("simple-dockerjs")
```

### inspect

Inspect docker objects - used with the `inspect.inspect()` function. 

**USAGE**: `inspect.inspect('object_id')`

**DOCKER COMMAND**: `docker inspect {{object_id}}`

#### Inspecting container

```js
const { inspect } = require("simple-dockerjs")
console.log(inspect.inspect('cb7148ae8e4e'))
```

output
```
Inspect { id: 'cb7148ae8e4e', running: true }
```
