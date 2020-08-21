/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useQuery } from '@apollo/react-hooks';
import {GET_BOOKS, BOOKS_SUBSCRIPTION} from '../../Utils/Queries.gql';
import { useEffect } from 'react';

const bookSortByName = (bookA, bookB) => {
  const aTitle = bookA.title.toLowerCase();
  const bTitle = bookB.title.toLowerCase();
  let result = 0
  if ( aTitle < bTitle ) {
    result = -1;
  } else if( aTitle > bTitle) {
    result = 1;
  } else {
    result = 0
  }
  return result;
};

export const useBookModel = () => {
    const { loading, error, data, subscribeToMore } = useQuery(GET_BOOKS);
    const books = data ? [].concat(data.books.sort(bookSortByName)) : [];

    useEffect(() => subscribeToMore({
            document: BOOKS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newBook = subscriptionData.data.bookAdded;
              return {
                books: [newBook, ...prev.books]
              };
            }
          }), [subscribeToMore]);

    return {loading, error, books};
};