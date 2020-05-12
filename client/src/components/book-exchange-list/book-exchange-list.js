import React, {Component} from "react";
import './book-exchange-list.css';
import { connect } from "react-redux";
import { withBookstoreService } from '../hoc';
import { fetchBooks } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../../spinner";
import ErrorIndicator from "../error-indicator";
import BookExchangeListItem from "../book-exchange-list-item";
import {CardGroup} from "react-bootstrap";
import {Button, Col, Row} from "antd";
import ModalBook from "../book-modal";
import BookGenreList from "../book-genre-list/book-genre-list";

const BookExchangeList = ({ books, onAddedToCart }) => {
    return (
        <CardGroup>
            {
                books.map((book) => {
                    return (
                        <li key={book.id}
                            className="book-item">
                            <BookExchangeListItem book={book}
                                          onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                    );
                })
            }
        </CardGroup>
    );
};

class BookExchangeListContainer extends Component{
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
        const { books, loading, error, onAddedToCart, isAuth } = this.props;
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
                    <Col span={4}><BookGenreList/>
                        <div className="vl"></div></Col>
                    <Col span={20}>
                        <BookExchangeList books={books} onAddedToCart={onAddedToCart} />
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
    fetchBooks


    // onAddedToCart: (id) => dispatch(bookAddedToCart(id))


    // return bindActionCreators({
    //     booksLoaded
    // }, dispatch);
        // booksLoaded: (newBooks) => {
        //     dispatch(booksLoaded(newBooks));
        // }

};




export default compose(withBookstoreService(), connect(mapStateToProps, mapDispatchToProps))(BookExchangeListContainer);

// export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookExchangeList));
