// @flow

const SUITS = ['spade', 'heart', 'diamond', 'club'];

module.exports.fromCard = (card: {suit: string, rank: number}) => {
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

	const codepoint: number = 0x1F0A0 + suitIndex * 0x10 + card.rank;
	return String.fromCodePoint(codepoint);
};

module.exports.fromSpecials = (card: {kind: string, variation: number}) => {
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
	} else if (card.kind === 'back') {
		if (card.variation === 0) {
			// U+1F0A0 PLAYING CARD BACK
			return String.fromCodePoint(0x1F0A0);
		}
	}

	throw new Error('Unknown specials');
};
