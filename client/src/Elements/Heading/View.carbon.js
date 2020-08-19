/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Heading = ({level, children, ...others}) => {
    let jsx;
    const headingProps = {...others, 'data-cb': true};
    switch(level) {
        default:
            case 1: jsx = (<h1 {...headingProps}>{children}</h1>); break;
            case 2: jsx = (<h2 {...headingProps}>{children}</h2>); break;
            case 3: jsx = (<h3 {...headingProps}>{children}</h3>); break;
            case 4: jsx = (<h4 {...headingProps}>{children}</h4>); break;
            case 5: jsx = (<h5 {...headingProps}>{children}</h5>); break;
    }

    return jsx;
}