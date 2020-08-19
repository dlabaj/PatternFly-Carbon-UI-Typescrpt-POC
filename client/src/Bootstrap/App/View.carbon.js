/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppModel } from './Model.js';

// needs thought
import 'carbon-components/scss/globals/scss/styles.scss';

import { Books, AddBook } from 'Groups';

import {Heading} from 'Elements'
import { Loading } from 'carbon-components-react';

export const App = () => {

  const {loading, error, getFeaturesForPage} = useAppModel();
  const {LIST, CREATE} = getFeaturesForPage('BOOKS');

  let jsx;

  if (loading) {
    jsx = (<Loading />);
  } else if (error) {
  jsx = (<span>{JSON.stringify(error)}</span>);
  } else {
    jsx = (     <React.Fragment>
      <Heading>Carbon Book page</Heading>
     
      {CREATE && <AddBook />}
      {LIST && <Books />} 
      </React.Fragment> );
  }

  return (
  <React.Fragment>
{jsx}
    </React.Fragment>
);};

