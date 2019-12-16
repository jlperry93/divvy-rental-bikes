## Description
An server application written in Express.JS to pull Divvy Rental Bike metrics. Application can be tested in Jasmine and run in Docker.

## Installation

```bash
$ npm install
```
## Formatting
```bash
# run formatter
$ npm run format
```

## Linting
```bash
# run linter
$ npm run lint
```

## Running the app

### Outside Docker
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

### Inside Docker
```bash
# production mode
$ npm run docker:start
```

## Test

### Outside Docker

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Inside Docker
```bash
# all tests w/coverage
$ npm run docker:test
```