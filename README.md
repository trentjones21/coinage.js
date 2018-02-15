# coinage.js

A javascript library for dealling with USD

## Install

```
$ npm install coinage.js
```

## Usage

Import the libary with

```
const USD = require('coinage')

```

There are 2 factory functions used to create instances of USD.

```
const money1 = USD.fromFloat(1.50)    // $1.50
const money2 = USD.fromFloat(150)     // $150.00
const money3 = USD.fromFloat(1.1)     // $1.10

const money4 = USD.fromString('1.50') // $1.50
const money5 = USD.fromString('150')  // $150.00
const money6 = USD.fromString('1.1')  // $1.10

```

Both `fromFloat` and `fromString` both restrict input to 2 decimal places.

```
// BAD

const money1 = USD.fromFloat(1.555)    // error
const money2 = USD.fromString('1.555') // error
```

## API

Functions for basic math are provided.  All instances of Money are immutable.  Each of the following functions returns a new instance.
