/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FunctionComponent } from 'react';
import {useBookModel} from './Books.model';
import {
    Table,
    TableHeader,
    TableBody,
  } from '@patternfly/react-table';
  import { Spinner } from '@patternfly/react-core';

export const Books: FunctionComponent<any> = () => {
  const { loading, error, books } = useBookModel();

  if (loading) return <Spinner />;
  if (error) {
    console.log(error);
    return <div>{`Error! ${error.message}`}</div>;
  }
  return ( <Table aria-label="Simple Table" cells={[
    'Title',
    'Author', 'Extra column']} rows={books.map(book => ({cells: Object.values(book)}))}>
  <TableHeader/>
  <TableBody />
  </Table>);
};