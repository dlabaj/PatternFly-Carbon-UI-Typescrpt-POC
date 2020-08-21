/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { useQuery } from '@apollo/react-hooks';
import {INTROSPECT} from 'Utils/Queries.gql';
import {get} from 'lodash';

const GQL_STRING = 'String';
const GQL_OBJECT = 'OBJECT';

const destructureFields = (fields) => {
    const toProcess = Array.isArray(fields) ? fields : []; // handles null - scalars have no fields
    return toProcess.map(({name, type}) => ({name, type: type.name}));
}

const destructureTypes = ({name, fields, kind}) => ({name, kind, fields: destructureFields(fields)});

const checkForName = (name) => (setToCheck) => hasName(name, setToCheck);

const hasName = (name, toCheck) => toCheck.find(obj => obj.name === name) ? true : false;

const hasNameAndType = (name, type, toCheck) => toCheck.find(obj => obj.name === name && obj.type === type) ? true : false;

const operations = {
    create: () => false,
    update: () => false,
    delete: () => false,
};

const AUTHOR = {
    Author: {
        type: 'Author',
        fields: {
            firstName: GQL_STRING,
            lastName: GQL_STRING
        },
        operations: {
            ...operations
        },
        retrievedSubscriptions: {
            newBookWritten: checkForName('newBookWritten')
        }
    }
};

const BOOK = { Book: {
    type: 'Book',
    fields: {
        title: GQL_STRING,
        author: GQL_STRING,
        authorObj: GQL_OBJECT
    },
    operations: {
        ...operations,
        create: checkForName('addBook')
    },
    retrievedSubscriptions: {
        bookAdded: checkForName('bookAdded')
    }
}};

const model = {
    ...BOOK,
    ...AUTHOR
};
const ourTypes = Object.values(model).map(entity => entity.type);

export const useIntrospect = () => {
    const { loading, error, data } = useQuery(INTROSPECT);

    const retrievedTypes = get(data, '__schema.types', []);
    const retrievedMutations = get(data, '__schema.mutationType.fields', []);
    const retrievedSubscriptions = get(data, '__schema.subscriptionType.fields', []);
    const expectedTypes = retrievedTypes.map(destructureTypes).filter(({name}) => ourTypes.includes(name));

    const modelFromSchema = Object.values(model).reduce((acc, expectedModel) => {
        const modelName = expectedModel.type;
        const retrievedModel = expectedTypes.find(type => type.name === expectedModel.type) || {fields: []}; // minimal shape which will return false when inspected

            // for each field true false
            const fields = Object.entries(expectedModel.fields).reduce((fieldAcc, [name, type]) => ({
                ...fieldAcc,
                [name]: hasNameAndType(name, type, retrievedModel.fields)
            }), {});
            // for each operation/subscription true false
            const operations = Object.entries(expectedModel.operations).reduce((fieldAcc, [operation, operationCb]) => ({
                ...fieldAcc,
                [operation]: operationCb(retrievedMutations) 
            }), {});
            const subscriptions = Object.entries(expectedModel.retrievedSubscriptions).reduce((fieldAcc, [subscriptionName, subscriptionCheckCallback]) => ({
                ...fieldAcc,
                [subscriptionName]: subscriptionCheckCallback(retrievedSubscriptions) 
            }), {});
      
        


        return {...acc,
        [modelName]: {fields, operations, subscriptions}};
    }, {});

    return {loading, error, modelFromSchema};
};