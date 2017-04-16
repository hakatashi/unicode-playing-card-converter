# unicode-playing-card-converter

[![npm version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[npm-image]: https://img.shields.io/npm/v/unicode-playing-card-converter.svg
[npm-url]: https://www.npmjs.com/package/unicode-playing-card-converter
[travis-image]: https://travis-ci.org/hakatashi/unicode-playing-card-converter.svg?branch=master
[travis-url]: https://travis-ci.org/hakatashi/unicode-playing-card-converter
[david-image]: https://david-dm.org/hakatashi/unicode-playing-card-converter.svg
[david-url]: https://david-dm.org/hakatashi/unicode-playing-card-converter
[david-dev-image]: https://david-dm.org/hakatashi/unicode-playing-card-converter/dev-status.svg
[david-dev-url]: https://david-dm.org/hakatashi/unicode-playing-card-converter#info=devDependencies

Convert playing card notation to an unicode character, and vice versa (coming soon).

Supported: Node.js 4+

```js
const converter = require('unicode-playing-card-converter');

// Get U+1F0A1 PLAYING CARD ACE OF SPADES
converter('As'); //=> '🂡'

// Get U+1F0DD PLAYING CARD QUEEN OF CLUBS
converter('Qc'); //=> '🃝'

// Get U+1F0CF PLAYING CARD BLACK JOKER
converter('X'); //=> '🃏'

// Get U+1F0C9 PLAYING CARD NINE OF DIAMONDS
converter({
	type: 'card',
	suit: 'diamond',
	rank: 9,
}); //=> '🃉'

// Get U+1F0BF PLAYING CARD RED JOKER
converter({
	type: 'special',
	kind: 'joker',
	variation: 2,
}); //=> '🂿'

// Get U+1F0A0 PLAYING CARD BACK
converter({
	type: 'special',
	kind: 'back',
	variation: 0,
}); //=> '🂠'
```
