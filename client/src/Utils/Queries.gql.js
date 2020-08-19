/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import gql from 'graphql-tag';

export const GET_BOOKS = gql`
  {
    books {
      title
      author
    }
  }
`;

export const BOOKS_SUBSCRIPTION = gql`
  subscription {
    bookAdded {
      title
      author
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      title
      author
    }
  }
`;


export const INTROSPECT = gql`
{
    __schema {
    
    types {
      name
    kind
    fields {
      name
      type {
        name
      }
    }
    }

    mutationType {
      fields {
        name
        args {
          name
        }
      }
    }

    subscriptionType {
      fields {
        name
        args {
          name
        }
      }
  }
    }


}
`;


