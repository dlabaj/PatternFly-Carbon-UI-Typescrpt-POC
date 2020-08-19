/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {useBookModel} from './Books.model.js';
import {
    Table,
    TableHeader,
    TableBody,
  } from '@patternfly/react-table';
  import { Spinner } from '@patternfly/react-core';

export const Books = () => {
  const { loading, error, books } = useBookModel();

  if (loading) return <Spinner />;
  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }
  return ( <Table aria-label="Simple Table" cells={[
    'Title',
    'Author', 'Extra column']} rows={books.map(book => ({cells: Object.values(book)}))}>
  <TableHeader/>
  <TableBody />
  </Table>);
};