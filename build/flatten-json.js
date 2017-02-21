
const refParser = require('json-schema-ref-parser');
const fs = require('fs');
const path = require('path');
const jsonPath = process.argv[2] || './schemas/v0';
const distPath = process.argv[3] || './dist';
const schemasRootPath = process.argv[4];
const beautify = require('js-beautify').js_beautify;
const mkdirp = require('mkdirp');
const glob = require('glob');


//Example usage:
// node flatten-json.js ../opendata-api-spec/schemas/v0/ ./dist ../opendata-api-spec/
// jsonPath: ../opendata-api-spec/schemas/v0/  location where all jsonSchemas are, which require flattening
// distPath: location/path to write the flattened schemas to
// schemasRootPath: root path where all schemas are present
if (schemasRootPath) {
 //runs a temporary local server in order to deference schemasRootPath
 //needed before we can publish them publicly
 const express = require('express');
 const server = express();
 server.use('/', express.static(path.resolve(schemasRootPath)));
 server.listen(8000);
}

glob('*/*.json', {
  cwd: jsonPath
}, (err, filenames ) => {
  if (err) {
    console.log(err);
    throw err;
  }
  var promises = [];
  filenames.forEach(filename => {
            promises.push(processFile(filename));
  });
  Promise.all(promises)
      .then((res) => {
                process.exit(0);
      })
      .catch((err) => {
                process.exit(1);
      });
  });

function beautifySchema(schema) {
    const beautifiedSchema = beautify(JSON.stringify(schema), {
        indent_size: 2
    });
    return beautifiedSchema;
}

function createMissingDirs(dir) {
  mkdirp.sync(dir, function(err) {
    if (err) console.error(err)
  })
}

function writeToFile(string, filePath) {
    return new Promise((resolve, reject) => {
        var destDir = path.dirname(filePath);
        createMissingDirs(destDir)
        fs.writeFile(filePath, string, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

function processFile(filename) {
    return new Promise((resolve, reject) => {
        if (filename.slice(-4) !== 'json') {
            resolve();
            return;
        }
        refParser
            .dereference(jsonPath + '/' + filename)
            .then((flattenedSchema) => {
                const beautifiedSchema = beautifySchema(flattenedSchema);
                const destination = distPath + '/' + filename;
                return writeToFile(beautifiedSchema, destination);
            })
            .then(() => {
                console.log('Correctly flattened ', filename);
                resolve();
            })
            .catch(err => {
                console.log('Failed while flattening ', filename);
                console.log(err);
                reject(err);
            });
    })
}
