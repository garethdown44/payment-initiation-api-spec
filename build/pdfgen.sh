#!/bin/sh

# Sanity check VERSION env var is set first !
set -e
node versions.js
pwd
cd ../
pwd
asciidoctor -r asciidoctor-pdf -b pdf asciidoc/index.adoc -a toc=left -a toclevels=4 -a numbered='' -o dist/payment-initiation-swagger.pdf
echo "Built PDF file"
cp dist/payment-initiation-swagger.pdf dist/$VERSION/payment-initiation-swagger.pdf
echo "Copied PDF file"
