#!/bin/sh

# arg1 = root directory of spec folder
# arg2 = version number to compile

swagger_dir=$1/compiled/$2/swagger
schema_dir=$1/schemas/$2
root_dir=$1

mkdir -p $root_dir/dist
mkdir -p $swagger_dir
rm -rf $swagger_dir/schemas/
mkdir $swagger_dir/schemas/

node flatten-json.js $schema_dir $swagger_dir/schemas/ $root_dir && \
node flatten-json.js $swagger_dir

# We remove $schema and id fields which are not supported
# We avoid inline replace with sed due to compatiblity issues
sed '/$schema/d' ./dist/opendata-swagger.json | sed '/\"id\"/d' > tmp-swagger.json
mv -f tmp-swagger.json ./dist/opendata-swagger.json