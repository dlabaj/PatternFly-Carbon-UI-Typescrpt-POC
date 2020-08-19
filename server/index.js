/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('apollo-server');
const http = require('http');

const PORT = 7500;

const pubsub = new PubSub();

let books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = `
  type Query { books: [Book] }
  type Subscription { bookAdded: Book }
  type Mutation { addBook(title: String, author: String) : Book }
  type Book { title: String, author: String }
`;

// const typeDefs = `
//   type Query { books: [Book] }
//   type Subscription { bookAdded: Book }
//   type Book { title: String, author: String }
// `;

const BOOK_ADDED = 'book_added';

const newBook = (args) => {
  books.push(args);
}

const getBooks = () => {
  return books;
}

const resolvers = {
  Query: { books: () => getBooks() },
  Subscription: { 
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    }
  },
  Mutation: {
    addBook(root, args, context) {
      pubsub.publish(BOOK_ADDED, { bookAdded: args });
      return newBook(args);
    },
  },
};

const app = express();

const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app})

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
