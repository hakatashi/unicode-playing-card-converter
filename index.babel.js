// @flow

const assert = require('assert');

const range = (start, end) => Array.from({length: (end - start + 1)}, (v, i) => i + start);

const SUITS = ['spade', 'heart', 'diamond', 'club'];
const ABBREBIATED_SUITS = ['s', 'h', 'd', 'c'];

const ABBREBIATED_RANKS = ['A', ...range(2, 9).map(n => n.toString()), 'T', 'J', 'Q', 'K'];
assert(ABBREBIATED_RANKS.length === 13);

const fromCard = module.exports.fromCard = (card: {suit: string, rank: number}) => {
	const suitIndex = SUITS.indexOf(card.suit);

	if (suitIndex === -1) {
		throw new Error(`Suit ${card.suit} is invalid`);
	}

	if (!Number.isInteger(card.rank)) {
		throw new Error('Rank should be integer');
	}

	if (!(1 <= card.rank && card.rank <= 13)) {
		throw new Error(`Rank ${card.rank} is invalid`);
	}

	const rankIndex = card.rank <= 11 ? card.rank : card.rank + 1;

	const codepoint: number = 0x1F0A0 + suitIndex * 0x10 + rankIndex;
	return String.fromCodePoint(codepoint);
};

const fromSpecial = module.exports.fromSpecial = (card: {kind: string, variation: number}) => {
	if (card.kind === 'joker') {
		if (card.variation === 0) {
			// U+1F0CF PLAYING CARD BLACK JOKER
			return String.fromCodePoint(0x1F0CF);
		} else if (card.variation === 1) {
			// U+1F0DF PLAYING CARD WHITE JOKER
			return String.fromCodePoint(0x1F0DF);
		} else if (card.variation === 2) {
			// U+1F0BF PLAYING CARD RED JOKER
			return String.fromCodePoint(0x1F0BF);
		}
	} else if (card.kind === 'knight') {
		if (Number.isInteger(card.variation) && 0 <= card.variation && card.variation <= 3) {
			return String.fromCodePoint(0x1F0AC + 0x10 * card.variation);
		}
	} else if (card.kind === 'back') {
		if (card.variation === 0) {
			// U+1F0A0 PLAYING CARD BACK
			return String.fromCodePoint(0x1F0A0);
		}
	}

	throw new Error('Unknown specials');
};

const fromObject = module.exports.fromObject = (card: {type: string, suit?: string, rank?: number, kind?: string, variation?: number}) => {
	if (card.type === 'card') {
		return fromCard({suit: String(card.suit), rank: Number(card.rank)});
	} else if (card.type === 'special') {
		return fromSpecial({kind: String(card.kind), variation: Number(card.variation)});
	}

	throw new Error(`Type ${card.type} is invalid`);
};

const _abbrToCard = module.exports._abbrToCard = (abbr: string): ?{suit: string, rank: number} => {
	const chars = Array.from(abbr);

	if (chars.length < 2) {
		return null;
	}

	const lastCharacter = chars[chars.length - 1];
	const leadingString = chars.slice(0, -1).join('');
	const suitIndex = ABBREBIATED_SUITS.indexOf(lastCharacter);

	if (suitIndex === -1) {
		return null;
	}

	const suit = SUITS[suitIndex];
	const rankIndex = ABBREBIATED_RANKS.indexOf(leadingString);

	if (rankIndex === -1) {
		return null;
	}

	const rank = rankIndex + 1;

	return {suit, rank};
};

const fromAbbr = module.exports.fromAbbr = (abbr: string): ?string => {
	const card = _abbrToCard(abbr);

	if (card === null) {
		return null;
	}

	return fromCard(card);
};
