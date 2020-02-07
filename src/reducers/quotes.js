export default (state = [], action) => {

  switch (action.type) {
    case 'ADD_QUOTE':
      return [...state, action.quote]
      // return state.concat(action.quote)
    
    case 'REMOVE_QUOTE':
      const i = state.findIndex(quote => quote.id === action.quoteId)
      return [...state.slice(0, i), ...state.slice(i + 1) ]
      // return state.filter(quote => quote.id !== action.quoteId);

    case 'UPVOTE_QUOTE':
      let voteIndex = state.findIndex(quote => quote.id === action.quoteId)
      let voteQuote = state[voteIndex]

      return [
        ...state.slice(0, voteIndex),
        Object.assign({}, voteQuote, { votes: voteQuote.votes += 1 }),
        ...state.slice(voteIndex + 1)
      ]

    case 'DOWNVOTE_QUOTE':
      let downvoteIndex = state.findIndex(quote => quote.id === action.quoteId)
      let downvoteQuote = state[downvoteIndex]

      let updateVotes = () => {
        if (downvoteQuote.votes > 0) {
          return downvoteQuote.votes -= 1
        } else {
          return downvoteQuote.votes 
        }
      }

      return [
        ...state.slice(0, downvoteIndex),
        Object.assign({}, downvoteQuote, { votes: updateVotes() }),
        ...state.slice(downvoteIndex + 1)
      ]


    default:
      return state;
  }
}


