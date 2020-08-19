/*
 * (C) Copyright IBM Corp. 2020  All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const path = require('path');
const fs = require('fs');

const src = path.resolve(__dirname, '../src');

// eslint-disable-next-line no-sync
const moduleNames = fs.readdirSync(src);

const viewLayer = process.env.cl === 'CARBON' ? 'carbon' : 'patternfly';

const modules = moduleNames.reduce((moduleConfig, name) => {
  const currentModule = {
    path: path.resolve(__dirname, `../src/${name}`),
    mapper: {
      regex: `^${name}(.*)$`,
      path: `<rootDir>/src/${name}$1`,
    },
  };
  return { ...moduleConfig, [name]: currentModule };
}, {});

const webpackAliases = Object.entries(modules).reduce(
  (aliases, [key, value]) => {
    const { path } = value;
    return { ...aliases, [key]: path };
  },
  {View: `./View.${viewLayer}.js`},
);

console.dir(webpackAliases);

module.exports = {
    webpackAliases
}