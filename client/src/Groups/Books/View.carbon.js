/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {useBookModel} from './Books.model.js';
import { DataTable, Loading } from 'carbon-components-react';
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

export const Books = () => {
  const { loading, error, books } = useBookModel();

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return `Error! ${error.message}`;
  }

  return (<DataTable headers={[
    {
      header: 'Title',
      key: 'title'
    },
    {
      header: 'Author',
      key: 'author'
    }]} rows={books.map((book, index) => ({id: `${index}-${book.title}`, ...book}))} render={({ rows, headers, getHeaderProps }) => (
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
    )}/>);
};