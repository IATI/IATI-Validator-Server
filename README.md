# _NOTE_

## IATI-Validator-Server (v1) is Deprecated
- v1 of the IATI Validator is now deprecated and superseded by v2
- This repository is Archived and not maintained by IATI

[Full Announcement](https://iatistandard.org/en/news/iati-focuses-on-improving-data-quality-by-enhancing-validator-services/)


Development
-----------

To run a local version without docker, and responsive to changes in the code:

```sh
npm install
nodemon server/server.js
```

This will use an in-memory database and local file storage in the `test/tmp`directory.

To run the tests:

```shell
npm test
```

To run a version connected to for instance a Google Kubernetes cluster, have a look at the configuration in `server/datasources.cluster-example.json` on how to override datasource settings, using local kubectl port-forwarding to a mongo database and a local service account file to access Google Cloud Storage.

To run with a different datasource configuration in `server/datasources.sandbox.json`:

```shell
NODE_ENV=sandbox nodemon server/server.js
```

Docker
------

To create a Docker image, run

```shell
docker build --no-cache --build-arg BUILD_ENV=sandbox -t my-api:v1 .
```

The *.local.js and *.local.json configuration files will be excluded from the Docker image.

The folder `local` can contain for instance the Google account info, and is excluded from git.

Project documentation
------

## process.env

`API_TYPE` - could be `public|empty`. If it's `public` we close all routes and open only the routes which exist in `server/custom-config/api.__env__.js`

`RUN_JOBS` - could be `run|empty`. This var used to run `job tasks` (only on one instance), to retrieve files from the IATI Datastore.

`DATASTORE_CRONSCHEDULE` - contains the desired cronjob schedule when running jobs.

## Model-config

We added the specific layer for `model-config.__env__.js`. Every file must use `bootstrap(config)` from `server/custom-config/bootstrap.js`

**Example:**

```js
'use strict';

const modelConfig = require('./model-config.json');
const bootstrap = require('./custom-config/bootstrap');

module.exports = bootstrap(modelConfig);
```

### Datastore cloning job

Copy new files from the [Datastore](https://api.datastore.iati.cloud/api/datasets). Run as a cronjob (default: refresh once per hour).
