# rw-api-spec

# Usage
```npm run start```  builds the project and runs a local webserver on http://localhost:8080/ serving the swagger spec using the spectacles-docs format

# Scripts
```npm run test``` runs the tests , validate swagger spec against the swagger schema (not the editor!!)

```npm run flatten-schemas``` flattens the schemas in the schema folder<br>
```npm run compile-swagger``` dereference the swagger spec split from  several yaml files to one fully dereferenced yaml file , dereferencing the schemas compiled using npm run flatten-schemas
