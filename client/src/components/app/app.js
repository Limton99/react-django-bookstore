import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/home";
import CartPage from "../pages/cart-page";
import BookDetail from "../pages/book-detail-page";
import BookListContainer from "../book-list/book-list";
import BookExchangeListContainer from "../book-exchange-list/book-exchange-list";
import Footer from "../Footer";
import ContactPage from "../pages/contact-us";
import AboutPage from "../pages/about-us";
import {bookAddedToCart, fetchBooks} from "../../actions";
import {connect} from "react-redux";
import BookExchangeDetail from "../pages/book-exchange-detail";
import ConnectedHeader from "../header/PageHeader";
import Misc from "../pages/edit-item-form";

const App = () => {
    return (
            <div>
                <ConnectedHeader numItems={5} total={210}/>

                    <Route path="/" component={HomePage} exact/>
                    <main className="container">
                    <Route path="/books" component={BookListContainer} exact/>
                    <Route path="/booksexchange" component={BookExchangeListContainer} exact/>
                    <Route path="/booksexchange/:id" component={BookExchangeDetail}/>
                    <Route path="/cart" component={CartPage}/>
                    <Route path="/books/:id" component={BookDetail} exact/>
                    <Route path="/books/edit/:id" component={Misc}/>

                    </main>
                <Route path="/contactus" component={ContactPage}/>
                <Route path="/aboutus" component={AboutPage}/>

                <Footer />
            </div>

    );
};

const mapStateToProps = ({ bookList: { books, loading, error} }) => {
    return { books, loading, error }
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return{
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }


};

export default connect(mapStateToProps, mapDispatchToProps)(App);


// export default withBookstoreService()(App);