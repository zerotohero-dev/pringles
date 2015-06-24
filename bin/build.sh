#!/usr/bin/env bash

# TODO: why bash? you can write this in Node.JS too.
# check if babel cam do this already:
# 1. clear out folder
# 2. traverse the directory tree
# 3. for each file, process it and mirror it to out.

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd );
SRC_SUFFIX='/../src';
DEST_SUFFIX='/../out';

SRC_DIR=$CWD$SRC_SUFFIX;
DEST_DIR=$CWD$DEST_SUFFIX;

rm -rf $DEST_DIR;

mkdir -p $DEST_DIR'/streams';
mkdir -p $DEST_DIR'/streams/fetch';
mkdir -p $DEST_DIR'/streams/fetch/init';
mkdir -p $DEST_DIR'/streams/fetch/childprocess';
mkdir -p $DEST_DIR'/streams/fetch/phantom';
mkdir -p $DEST_DIR'/streams/fetch/phantom/io';
mkdir -p $DEST_DIR'/streams/fetch/phantom/init';
mkdir -p $DEST_DIR'/streams/fetch/phantom/handlers';

PATHS=(
    '/index.js'
    '/streams/fetch/index.js'
    '/streams/fetch/init/index.js'
    '/streams/fetch/childprocess/index.js'
    '/streams/fetch/phantom/index.js'
    '/streams/fetch/phantom/io/index.js'
    '/streams/fetch/phantom/init/index.js'
    '/streams/fetch/phantom/handlers/index.js'
);

for path in ${PATHS[*]}; do
    babel $SRC_DIR$path > $DEST_DIR$path;

    echo '[CONVERTED]: ' $path;
done

echo '[ALL DONE]';
