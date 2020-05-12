import updateBookList from './book-list';
import updateGenreList from "./genre-list";
import updateShoppingCart from './shopping-cart';
import updateAuth from "./auth-reducer";
import updateSellerList from "./seller-list";
import updateError from "./error-reducer"

const reducer = (state, action) => {
  return {
    bookList: updateBookList(state, action),
    genreList: updateGenreList(state, action),
    shoppingCart: updateShoppingCart(state, action),
    auth: updateAuth(state, action),
    sellerList: updateSellerList(state, action),
    errors: updateError(state, action)
  };
};

export default reducer;
