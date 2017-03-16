var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var path = require('path');
var fs = require('fs');
const express = require('express');
const server = express();
const utils = require('./utils');
const compiled = path.resolve('../compiled');

server.use('/', express.static(compiled));
server.listen(8000);

var swaggerFilePath = path.resolve('../apis/v0/swagger/index.yaml');
process.chdir(path.dirname(swaggerFilePath));

var root = YAML.load(fs.readFileSync(swaggerFilePath).toString());
var options = {
  //I had to put remote because this relative loader doesnt go 'up' --> ../../
  //quick and dirty before we have a better solution
  filter        : ['relative' , 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.load(res.text));
    }
  }
};

resolve(root, options)
.then(function (results) {
    return Promise.all([
    utils.writeToFile(YAML.safeDump(results.resolved, { lineWidth: 200 }), compiled + '/swagger/rw-swagger.yaml'),
    utils.writeToFile(JSON.stringify(results.resolved, null, 2), compiled + '/swagger/rw-swagger.json')
  ])
})
.then(function(res) {
  process.exit(0);
});
