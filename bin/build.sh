#!/usr/bin/env bash

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd );
SRC_SUFFIX='/../src';
DEST_SUFFIX='/../out';
#DIR = $PWD + "..";

SRC_DIR=$CWD$SRC_SUFFIX;
DEST_DIR=$CWD$DEST_SUFFIX;

mkdir -p $DEST_DIR'/phantom';
mkdir -p $DEST_DIR'/phantom/handlers';
mkdir -p $DEST_DIR'/phantom/init';
mkdir -p $DEST_DIR'/phantom/io';

PATHS=(
    '/fetch.js'
    '/handlers/index.js'
    '/init/index.js'
    '/io/index.js'
);

for path in ${PATHS[*]}; do
    babel $SRC_DIR'/phantom'$path > $DEST_DIR'/phantom'$path;

    echo '[CONVERTED]: ' $path;
done

echo '[ALL DONE]';
