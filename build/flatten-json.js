const refParser = require('json-schema-ref-parser');
const jsonPath = process.argv[2] || './schemas/v0';
const distPath = process.argv[3] || './dist';
const schemasRootPath = process.argv[4];
const glob = require('glob');
const YAML = require('json2yaml')
const utils = require('./utils');


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
 server.use('/', express.static(schemasRootPath));
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



function processFile(filename) {
    return new Promise((resolve, reject) => {
        if (filename.slice(-4) !== 'json') {
            resolve();
            return;
        }
        refParser
            .dereference(jsonPath + '/' + filename)
            .then((flattenedSchema) => {
                const beautifiedSchema = utils.beautifySchema(flattenedSchema);
                const yamlSchema = YAML.stringify(flattenedSchema);
                const destination = distPath + '/' + filename;
                const destinationYaml = distPath + '/' + filename.replace('.json','.yaml');
                return Promise.all([
                  utils.writeToFile(beautifiedSchema, destination),
                  utils.writeToFile(yamlSchema, destinationYaml)
                ]);
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
