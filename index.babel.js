// @flow

const SUITS = ['spade', 'heart', 'diamond', 'club'];

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
		return fromCard(card);
	} else if (card.type === 'special') {
		return fromSpecial(card);
	}

	throw new Error(`Type ${card.type} is invalid`);
};
