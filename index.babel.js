// @flow

const SUITS = ['spade', 'heart', 'diamond', 'club'];

module.exports.fromCard = (card: {suit: string, rank: number}) => {
	const suitIndex = SUITS.indexOf(card.suit);

	if (suitIndex === -1) {
		throw new Error(`Suit ${card.suit} is invalid`);
	}

	if (!Number.isInteger(card.rank)) {
		throw new Error('rank should be integer');
	}

	if (!(1 <= card.rank && card.rank <= 13)) {
		throw new Error(`rank ${card.rank} is invalid`);
	}

	const codepoint: number = 0x1F0A0 + suitIndex * 0x10 + card.rank;
	return String.fromCodePoint(codepoint);
};

module.exports.fromSpecials = (card: {kind: string, variation: number}) => {
	throw new Error('not implemented');
};
