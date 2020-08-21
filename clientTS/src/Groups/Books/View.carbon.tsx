/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FunctionComponent } from 'react';
import { useBookModel } from './Books.model ';
import { DataTable, TableBody, TableCell, TableContainer, Table, TableHead, TableRow, TableHeader, Loading } from 'carbon-components-react';

export const Books: FunctionComponent = () => {
  const { loading, error, books } = useBookModel();

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <div>{`Error! ${error.message}`}</div>;
  }

  return (<DataTable headers={[
    {
      header: 'Title',
      key: 'title'
    },
    {
      header: 'Author',
      key: 'author'
    }]} rows={books.map((book, index) => ({ id: `${index}-${book.title}`, ...book }))} render={({ rows, headers, getHeaderProps }) => (
      <TableContainer title="DataTable">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )} />);
};