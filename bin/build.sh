#!/usr/bin/env bash

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd );
SRC_SUFFIX='/../src';
DEST_SUFFIX='/../out';
#DIR = $PWD + "..";

SRC_DIR=$CWD$SRC_SUFFIX;
DEST_DIR=$CWD$DEST_SUFFIX;

mkdir -p $DEST_DIR'/phantom';

touch -f $DEST_DIR'/phantom/fetch.js';
babel $SRC_DIR'/phantom/fetch.js' > $DEST_DIR'/phantom/fetch.js';