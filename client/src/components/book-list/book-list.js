import React, {Component} from "react";
import BookListItem from "../book-list-item";
import './book-list.css';
import { connect } from "react-redux";
import { fetchBooks, bookAddedToCart, deleteArticle } from "../../actions";
import Spinner from "../../spinner";
import ErrorIndicator from "../error-indicator";
import {CardGroup} from "react-bootstrap";
import {Button, Col, Row} from "antd";
import ModalBook from "../book-modal";
import BookGenreList from "../book-genre-list/book-genre-list";

const BookList = ({ books, bookAddedToCart, deleteArticle }) => {
    return (
        <CardGroup>
            {
                books.map((book) => {
                    return (
                        <li key={book.id}
                            className="book-item">
                            <BookListItem book={book}
                                  bookAddedToCart={() => bookAddedToCart(book.id)}
                                  deleteArticle={() => deleteArticle(book.id)}
                            />
                        </li>
                    );
                })
            }
        </CardGroup>
    );
};

class BookListContainer extends Component{
    state = {
        modalBlogVisible: false
    }






    componentDidMount() {
        this.props.fetchBooks();


    }

    render() {

        const openModal = () => {
            this.setState({
                modalBlogVisible: true
            })
        }

        const closeModal = () => {
            this.setState({
                modalBlogVisible: false
            })
        }
        const { books, loading, error, bookAddedToCart, deleteArticle, isAuth } = this.props;
        if(loading) {
            return <Spinner />
        }


        const AddButton = (
            <Button className="add-new" type="primary" block size="small" style={{margin: 10}} onClick={openModal}>
                <i className="fa fa-plus" aria-hidden="true"/>
            </Button>);

        if(error){
            return <ErrorIndicator />
        }
        return (
            <React.Fragment>
                {isAuth ? AddButton:""}
                <Row style={{marginTop: 20}}>
                    <Col span={4} ><BookGenreList/>
                        <div className="vl"></div></Col>
                    <Col span={20}>
                         <BookList  books={books} bookAddedToCart={bookAddedToCart} deleteArticle={deleteArticle} isAuth={isAuth}/>
                    </Col>
                </Row>
                <ModalBook modalBlogVisible={this.state.modalBlogVisible} close={closeModal}/>

            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ bookList: { books, loading, error}, auth: {isAuth} }) => {
    return { books, loading, error, isAuth }
};

const mapDispatchToProps = {
    fetchBooks,
    bookAddedToCart,
    deleteArticle

    // onAddedToCart: (id) => dispatch(bookAddedToCart(id))


    // return bindActionCreators({
    //     booksLoaded
    // }, dispatch);
    // booksLoaded: (newBooks) => {
    //     dispatch(booksLoaded(newBooks));
    // }

};




export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer);
