const YAML = require('js-yaml');
const SwaggerParser = require('swagger-parser');
const utils = require('./utils');
const path = require('path');
const swaggerDir = './compiled/swagger';
const compiled = path.resolve('../compiled');
const dist = path.resolve('../dist');

var swaggerIndex = path.resolve('../apis/v0/swagger/index.yaml');

//https://github.com/BigstickCarpet/swagger-parser/blob/releases/4.0.0/docs/options.md
const SwaggerParserOptions = {
  validate: {
    spec: true,
    schema: true
  }
};
SwaggerParser.bundle(swaggerIndex, SwaggerParserOptions,
  (err, api, metadata) => {
    if (err) {
      console.error(err);
      throw err
    }
    utils.writeToFile(YAML.safeDump(api, { lineWidth: 200 }), compiled + '/swagger/rw-swagger.yaml')
    utils.writeToFile(JSON.stringify(api, null, 2), compiled + '/swagger/rw-swagger.json')
    // temporary....
    utils.writeToFile(YAML.safeDump(api, { lineWidth: 200 }), dist + '/rw-swagger.yaml')
    utils.writeToFile(JSON.stringify(api, null, 2), dist + '/rw-swagger.json')
});
