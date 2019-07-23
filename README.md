# radix

[![NPM version](https://img.shields.io/npm/v/@imhele/radix.svg?style=flat)](https://npmjs.org/package/@imhele/radix)
[![NPM downloads](http://img.shields.io/npm/dm/@imhele/radix.svg?style=flat)](https://npmjs.org/package/@imhele/radix)
[![Build Status](https://travis-ci.com/imhele/radix.svg?branch=master)](https://travis-ci.com/imhele/radix)
[![Coverage Status](https://coveralls.io/repos/github/imhele/radix/badge.svg?branch=master)](https://coveralls.io/github/imhele/radix?branch=master)
[![License](https://img.shields.io/npm/l/@imhele/radix.svg)](https://npmjs.org/package/@imhele/radix)

## Install

```sh
$ npm install @imhele/radix --save
or
$ yarn add @imhele/radix
```

## Exmaple

```js
import changeRadix from '@imhele/radix';

changeRadix('2', { fromRadix: 10, toRadix: 2 });
// '10'
changeRadix('FFFF', { fromRadix: 16, toRadix: 32 });
// '1VVV'
changeRadix(12345678, { fromRadix: 10 });
// 'pnfq'
changeRadix('12345678', { fromRadix: 10, toCharMap: '0123456789abcdef' });
// 'bc614e'
```

## Throw error

Does not suport decimal.

```js
changeRadix(1.2);
// ERROR:
// [radix] The input message `1.1` include the char `.`
// that does not exist in char map `0123456789abcde...`

changeRadix(2, { toRadix: 1 });
changeRadix(2, { toRadix: 2.2 });
changeRadix(2, { toRadix: 100, toCharMap: '01' });
// ERROR:
// [radix] The radix must be an integer between `2`
// and `charMap.length (62)`, but got `1`
```
