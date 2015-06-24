#!/usr/bin/env bash

# TODO: why bash? you can write this in Node.JS too.
# check if babel cam do this already:
# 1. clear out folder
# 2. traverse the directory tree
# 3. for each file, process it and mirror it to out.

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd );
SRC_SUFFIX='/../src';
DEST_SUFFIX='/../lib';
ES6_EXT='.es6'
JS_EXT='.js'

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
    '/index'
    '/streams/fetch/index'
    '/streams/fetch/init/index'
    '/streams/fetch/childprocess/index'
    '/streams/fetch/phantom/index'
    '/streams/fetch/phantom/io/index'
    '/streams/fetch/phantom/init/index'
    '/streams/fetch/phantom/handlers/index'
);

for path in ${PATHS[*]}; do
    babel $SRC_DIR$path$ES6_EXT > $DEST_DIR$path$JS_EXT;

    echo '[CONVERTED]: ' $path;
done

echo '[ALL DONE]';
