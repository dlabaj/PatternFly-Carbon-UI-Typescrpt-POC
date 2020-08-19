/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useIntrospect } from 'Hooks';
import { get } from 'lodash';

const getFlags = (modelFromSchema) => ({
    PAGE: {
        BOOKS: {
            LIST: get(modelFromSchema, 'Book.fields.title', false) &&  get(modelFromSchema, 'Book.fields.author', false),
            CREATE: get(modelFromSchema, 'Book.operations.create', false)
        }
    }
})

export const useAppModel = () => {
    const {loading, error, modelFromSchema } = useIntrospect();

    const flags = getFlags(modelFromSchema);
    const getFeaturesForPage = (page) => get(flags, `PAGE.${page}`);

    return {loading, error, getFeaturesForPage};
};