'use strict';

import {args} from 'system';
import {create} from 'webpage';

import {prepare, run} from './init';

{
    let page = create();

    prepare(page);
    run(page, args);
}
