#!/bin/sh
# arg1 = version number to compile
rm -rf ../compiled/schemas/
mkdir ../compiled/schemas/

node flatten-json.js ../schemas/$1 ../compiled/schemas/$1 ../
