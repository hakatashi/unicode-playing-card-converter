require! {
  '../index.babel.js': converter
  chai: {expect}
}

chr = String.from-code-point

{it: It, describe: Describe} = global

Describe 'converter.fromCard' ->
  It 'is typed' ->
    expect -> converter.from-card null
    .to.throw TypeError

    expect -> converter.from-card suit: 1, rank: 1
    .to.throw TypeError

    expect -> converter.from-card suite: 'spade', rank: 1
    .to.throw TypeError

  It 'converts card object to unicode playing card character' ->
    # U+1F0A1 🂡 PLAYING CARD ACE OF SPADES
    expect converter.from-card suit: 'spade', rank: 1 .to.equal chr 0x1F0A1
    # U+1F0C3 🃃 PLAYING CARD THREE OF DIAMONDS
    expect converter.from-card suit: 'diamond', rank: 3 .to.equal chr 0x1F0C3
    # U+1F0B7 🂷 PLAYING CARD SEVEN OF HEARTS
    expect converter.from-card suit: 'heart', rank: 7 .to.equal chr 0x1F0B7
    # U+1F0DC 🃜 PLAYING CARD KNIGHT OF CLUBS
    expect converter.from-card suit: 'club', rank: 12 .to.equal chr 0x1F0DC

  It 'throws when unknown suit is given' ->
    expect -> converter.from-card suit: 'blah', rank: 1
    .to.throw 'Suit blah is invalid'

  It 'throws when non-integer rank is given' ->
    expect -> converter.from-card suit: 'heart', rank: 1.04
    .to.throw 'Rank should be integer'

  It 'throws when invalid rank is given' ->
    expect -> converter.from-card suit: 'heart', rank: 100
    .to.throw 'Rank 100 is invalid'

Describe 'converter.fromSpecial' ->
  It 'is typed' ->
    expect -> converter.from-special null
    .to.throw TypeError

    expect -> converter.from-special kind: 1, variation: 1
    .to.throw TypeError

    expect -> converter.from-special type: 'joker', variation: 0
    .to.throw TypeError

  It 'interprets jokers' ->
    # U+1F0CF 🃏 PLAYING CARD BLACK JOKER
    expect converter.from-special kind: 'joker', variation: 0 .to.equal chr 0x1F0CF
    # U+1F0DF 🃟 PLAYING CARD WHITE JOKER
    expect converter.from-special kind: 'joker', variation: 1 .to.equal chr 0x1F0DF
    # U+1F0BF 🂿 PLAYING CARD RED JOKER
    expect converter.from-special kind: 'joker', variation: 2 .to.equal chr 0x1F0BF

    expect -> converter.from-special kind: 'joker', variation: 3
    .to.throw 'Unknown special'

  It 'interprets back' ->
    # U+1F0A0 🂠 PLAYING CARD BACK
    expect converter.from-special kind: 'back', variation: 0 .to.equal chr 0x1F0A0

    expect -> converter.from-special kind: 'back', variation: 1
    .to.throw 'Unknown special'

  It 'throws when invalid kind is given' ->
    expect -> converter.from-special kind: 'blah', variation: 0
    .to.throw 'Unknown special'

Describe 'converter.fromObject' ->
  It 'converts object notation along with types' ->
    expect converter.from-object type: 'card', suit: 'heart', rank: 1 .to.equal chr 0x1F0B1
    expect converter.from-object type: 'special', kind: 'joker', variation: 0 .to.equal chr 0x1F0CF

  It 'throws when unknown type is given' ->
    expect -> converter.from-object type: 'blah'
    .to.throw 'Type blah is invalid'
