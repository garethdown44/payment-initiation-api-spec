var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var path = require('path');
var fs = require('fs');
const express = require('express');
const server = express();
server.use('/', express.static(path.resolve('../compiled')));
server.listen(8000);


var swaggerFilePath = path.resolve('../apis/v0/swagger/index.yaml');
process.chdir(path.dirname(swaggerFilePath));

var root = YAML.load(fs.readFileSync(swaggerFilePath).toString());
var options = {
  filter        : ['relative' , 'remote'],
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.load(res.text));
    }
  }
};
resolve(root, options).then(function (results) {
  //TODO write to file.....refactor utils.
  console.log(JSON.stringify(results.resolved, null, 2));
  process.exit(1);
});
