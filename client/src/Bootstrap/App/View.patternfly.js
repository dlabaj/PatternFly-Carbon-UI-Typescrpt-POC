/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppModel } from './Model.js';

// needs thought
import '@patternfly/react-core/dist/styles/base.css';

import { Books, AddBook } from 'Groups';

import {Heading} from 'Elements'
import { Spinner } from '@patternfly/react-core';

export const App = () => {

  const {loading, error, getFeaturesForPage} = useAppModel();
  const {LIST, CREATE} = getFeaturesForPage('BOOKS');

  let jsx;

  if (loading) {
    jsx = (<Spinner />);
  } else if (error) {
  jsx = (<span>{JSON.stringify(error)}</span>);
  } else {
    jsx = (     <React.Fragment>
      <Heading>Patternfly Book page</Heading>
     
      {LIST && <Books />} 
      {CREATE && <AddBook />}
      </React.Fragment> );
  }

  return (
  <React.Fragment>
{jsx}
    </React.Fragment>
);};