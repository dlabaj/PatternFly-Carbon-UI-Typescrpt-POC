/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {useAddBookModel} from './AddBook.model.js';

import { TextInput, Button } from '@patternfly/react-core';

import { Heading } from '../../Elements';

export const AddBook = () => {
  const {onTitleChange, onAuthorChange, isInvalid, addNewBook} = useAddBookModel(value => value);

  return (
    <div>
      <Heading level={2}>Add a new book</Heading>
      <TextInput onChange={onTitleChange} aria-label='Book title'/>
      <TextInput onChange={onAuthorChange} aria-label='Author'/>
      <Button variant="primary" isDisabled={isInvalid} onClick={addNewBook}>Add book</Button>
    </div>
  );;
}

