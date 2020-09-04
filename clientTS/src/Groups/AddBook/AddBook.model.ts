/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMutation } from '@apollo/react-hooks';
import { debounce } from '@patternfly/react-core';
import { useState, useCallback } from 'react';
import {ADD_BOOK} from '../../Utils/Queries.gql';

const TIME: number = 100;

const onChangeValueGetter = (evt) => evt.target.value;

export const useAddBookModel = (onChangeHandler = onChangeValueGetter) => {
    const [addBook] = useMutation(ADD_BOOK);
    const [title, updateTitle] = useState('');
    const [author, updateAuthor] = useState('');
    const debouncedTitleUpdate = useCallback(debounce(updateTitle, TIME), [updateTitle]);
    const debouncedAuthorUpdate = useCallback(debounce(updateAuthor, TIME), [updateAuthor]);


    return {
        isInvalid: title.length === 0 && author.length === 0,
        addNewBook: () => addBook({variables: {title, author}}),
        onTitleChange: (evt) => debouncedTitleUpdate(onChangeHandler(evt)),
        onAuthorChange: (evt) => debouncedAuthorUpdate(onChangeHandler(evt))
    };
}