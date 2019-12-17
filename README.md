## Description
An server application written in Express.JS to pull Divvy Rental Bike metrics. Application can be tested in Jest and run in Docker.

## Installation

```bash
$ npm install
```

## Linting
```bash
# run linter and fix linter issues
$ npm run prebuild
```

## Running the app locally

IMPORTANT NOTE: The original CSV file was **too large** and replaced with a smaller file. To run original file, please place original CSV in `data` directory and replace the code in `/src/services/tripsService.ts`

FROM THIS (line 13)
```typescript
fs
.createReadStream(path.join(TripsService.filepath, "../../data/Divvy_Trips_2019_Mock"))
```

TO THIS (line 13)
```typescript 
fs
.createReadStream(path.join(TripsService.filepath, "../../data/Divvy_Trips_2019_Q2"))
```

```bash
# development
$ npm run start
```

## Running the application in Docker

```bash
docker pull jlperry93/divvy-rental-program:latest
docker run -p 49160:8080 --rm jlperry93/divvy-rental-program
```

## Test

#### NOTE: I could not figure out how to mock the https request without the use of a third party library so it's testing the actual service. I know, terrible, but I wanted to get this out for review. Let me know if you want me to give it another try.

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```


# API Documentation


## Stations
 

```bash
/stations/{id}
```
### Headers

**Authorization**: *string*

### Params

**id**: *string*[]

## Riders

```bash
/riders/{id}/{date}
```

### Headers

**Authorization**: *string*

### Params

**id**: *string*[]

**data**: *string* Format (YYYY-MM-DD)


## Trips
```bash
/recenttrips/{id}/{date}
```

### Headers

**Authorization**: *string*

### Params

**id**: *string*[]

**data**: *string* Format (YYYY-MM-DD)