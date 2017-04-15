require! {
  '../': converter
  chai: {expect}
}

chr = String.from-code-point

{it: It, describe: Describe} = global

Describe 'converter.fromCard' ->
  It 'converts card object to unicode playing card character' ->
    # U+1F0A1 🂡 PLAYING CARD ACE OF SPADES
    expect converter.from-card suit: 'spade', rank: 1 .to.equal chr 0x1F0A1
    # U+1F0C3 🃃 PLAYING CARD THREE OF DIAMONDS
    expect converter.from-card suit: 'diamond', rank: 3 .to.equal chr 0x1F0C3
    # U+1F0B7 🂷 PLAYING CARD SEVEN OF HEARTS
    expect converter.from-card suit: 'heart', rank: 7 .to.equal chr 0x1F0B7
    # U+1F0DC 🃜 PLAYING CARD KNIGHT OF CLUBS
    expect converter.from-card suit: 'club', rank: 13 .to.equal chr 0x1F0DC

Describe 'converter.fromSpecials' ->
  It 'interprets jokers' ->
    # U+1F0CF 🃏 PLAYING CARD BLACK JOKER
    expect converter.from-specials type: 'joker', variation: 0 .to.equal chr 0x1F0CF
    # U+1F0DF 🃟 PLAYING CARD WHITE JOKER
    expect converter.from-specials type: 'joker', variation: 1 .to.equal chr 0x1F0DF
    # U+1F0BF 🂿 PLAYING CARD RED JOKER
    expect converter.from-specials type: 'joker', variation: 2 .to.equal chr 0x1F0BF

  It 'interprets back' ->
    # U+1F0A0 🂠 PLAYING CARD BACK
    expect converter.from-specials type: 'back', variation: 0 .to.equal chr 0x1F0A0
