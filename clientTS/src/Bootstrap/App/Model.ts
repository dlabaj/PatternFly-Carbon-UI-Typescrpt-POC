/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useIntrospect } from 'Hooks';

const getFlags = (modelFromSchema) => ({
    PAGE: {
        BOOKS: {
            LIST: modelFromSchema.Book.fields.title && modelFromSchema.Book.fields.author,
            CREATE: modelFromSchema.Book.operations.create
        }
    }
})

export const useAppModel = () => {
    const {loading, error, modelFromSchema } = useIntrospect();

    const flags = getFlags(modelFromSchema);
    const getFeaturesForPage = (page) => flags.PAGE[page];

    return {loading, error, getFeaturesForPage};
};