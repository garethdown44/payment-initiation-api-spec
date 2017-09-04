const YAML = require('js-yaml');
const SwaggerParser = require('swagger-parser');
const utils = require('./utils');
const path = require('path');
const compiled = path.resolve('../compiled');
const version = process.env.VERSION;
const dist = path.resolve('../dist');
const distV = path.resolve('../dist/' + version);
const swaggerIndex = path.resolve('../apis/' + version + '/swagger/index.yaml');
const fWrite = utils.writeToFile;  // Convenient method name shortening

// https://github.com/BigstickCarpet/swagger-parser/blob/releases/4.0.0/docs/options.md
const SwaggerParserOptions = {
  validate: {
    spec: true,
    schema: true
  }
};


function flatten(arr) {
  return Array.prototype.concat(...arr);
}

function flatten_parameters(api) {

  let apiFlatter = {};
  Object.assign(apiFlatter, api);
  const paths = Object.keys(api.paths); // e.g. /account, /balances

  paths.map((path) => {

    let pathPartial = api.paths[path];

    if (typeof pathPartial.length === 'number') {
      // Fix for yaml parsing error where objects become under a 1 element array [{}]
      pathPartial = pathPartial[0];
      apiFlatter.paths[path] = pathPartial;
    }

    let methods = Object.keys(pathPartial); // e.g. get, post, delete

    methods.map((method) => {
      let methodPartial = pathPartial[method];
      if (methodPartial.parameters) {
        // Fix for parameters becoming an array of arrays [[{}],[{},{}]] => [{},{},{}]
        let flatParams = flatten(methodPartial.parameters);
        apiFlatter.paths[path][method].parameters = flatParams;
      }
    })
  });
  return apiFlatter;
}


SwaggerParser.dereference(swaggerIndex, SwaggerParserOptions,
  (err, api /*, metadata */) => {
    if (err) {
      console.error(err);
      throw err
    }

    let apiFixed = flatten_parameters(api);  // Mitigate the Array of Arrays Problem

    fWrite(YAML.safeDump(api, {lineWidth: 200}), compiled + '/swagger/payment-initiation-swagger.yaml');
    fWrite(JSON.stringify(api, null, 2), compiled + '/swagger/payment-initiation-swagger.json');
    // temporary....
    fWrite(YAML.safeDump(api, {lineWidth: 200}), dist + '/payment-initiation-swagger.yaml');
    fWrite(JSON.stringify(api, null, 2), dist + '/payment-initiation-swagger.json');

    fWrite(YAML.safeDump(api, {lineWidth: 200}), distV + '/payment-initiation-swagger.yaml');
  });
