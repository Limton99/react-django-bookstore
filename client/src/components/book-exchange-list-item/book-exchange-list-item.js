import React, {Fragment} from "react";
import './book-exchange-list-item.css';
import {Link} from "react-router-dom";
import BookDetail from "../pages/book-detail-page";
import {Card} from "react-bootstrap";
import {Col} from "antd";
import { connect } from 'react-redux'

const BookExchangeListItem = ({ book, isAuth }) => {

    const { id, title, author, member, image } = book;

    const connectButton = (<a href="https://chatbro.com/25NLV" className="btn btn-info add-to-cart">Connect</a>);
    return (
        <Fragment>

            <Card className="book-list-item" style={{width: 200 }}>
                <Link to={`/booksexchange/${id}`} >

                <Card.Img variant="top"  src={image} style={{height: 300}} />
                </Link>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <div className="book-author" >Author:{author}</div>
                        <div className="book-price">Member:{member}</div>
                        {isAuth?connectButton:""}
                    </Card.Text>
                </Card.Body>
            </Card>


        </Fragment>
    );
};

const mapStateToProps = ({ auth: {isAuth} }) => {
    return { isAuth }
};

export default connect(mapStateToProps)(BookExchangeListItem);