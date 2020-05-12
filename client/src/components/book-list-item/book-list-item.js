import React, {Fragment} from "react";
import './book-list-item.css';
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {connect} from 'react-redux'

const BookListItem = ({ book, bookAddedToCart, deleteArticle, isAuth }) => {
    // console.log(book);

    const { id, title, author, price, genre, image } = book;


    const EditButthon = (<Link to={`/books/edit/${id}`} className="btn btn-primary">Edit item</Link>);
    const DeleteButthon = (<button onClick={deleteArticle} className="btn btn-info add-to-cart">Delete</button>);
    const AddButthon = (<button onClick={bookAddedToCart} className="btn btn-info add-to-cart">Add to cart</button>);

    return (
        <Fragment>


            <Card className="book-list-item" style={{width: 200 }}>
                <Link to={`/books/${id}`} >
                <Card.Img variant="top"  src={image} style={{height: 300}} />
                </Link>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <div className="book-author">Author: {author}</div>
                        <div className="book-author">Genre: {genre.name}</div>
                        <div className="book-price">Price: ${price}</div>
                        {isAuth?AddButthon:""}
                    </Card.Text>
                </Card.Body>
                {/*<Link to={`/books/edit/${id}`}>Edit item</Link>*/}
                {/*{isAuth?EditButthon:""}*/}
                {/*<button onClick={deleteArticle} className="btn btn-info add-to-cart">Delete</button>*/}

                {/*{isAuth?DeleteButthon:""}*/}


            </Card>



        </Fragment>
    );
};

const mapStateToProps = ({ auth: {isAuth} }) => {
    return { isAuth }
};




export default connect(mapStateToProps)(BookListItem);