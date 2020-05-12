const updateBookList = (state, action) => {

  if (state === undefined) {
    return {
      books: [],
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_BOOK_ADD':
      return {
        books: [...state.books, action.payload],
        loading: false,
        error: null
      }
    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload
      };
      case 'FETCH_DETAIL_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null
      };
    case 'DELETE_BOOK':
      console.log(action.payload) // id article

      return {
        ...state,
        books: removeById(state.books, action.payload)
      }
    default:
      return state.bookList;
  }


};

function removeById(list, id) {
  for(let i = list.length - 1; i >= 0; i--) {
    if(list[i].id === id) {
      list.splice(i, 1)
      break
    }
  }
  return [...list]
}

export default updateBookList;
