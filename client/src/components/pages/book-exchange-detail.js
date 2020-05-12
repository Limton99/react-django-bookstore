import React, {Component, Fragment} from "react";
import {Row, Col} from 'antd'
import { connect } from "react-redux";
import axios from "axios";
import {Card} from "react-bootstrap";
import {bookAddedToCart, fetchBooks} from "../../actions";
import {Link} from "react-router-dom";


class BookExchangeDetail extends Component{

    state = {
        book: null
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get('/api/v1/shop/detail/' + id)
            .then(res => {
                this.setState({
                    book: res.data
                })
            })
    }


    render() {
        const { onAddedToCart } = this.props;
        const editButton = (<a href="https://chatbro.com/25NLV" className="btn btn-info add-to-cart">Connect</a>);

        console.log(this.state.book);
        const book = this.state.book ? (
            <div style={{margin: 50}}>
                <Row>
                    <Col span={8} >

                            <img src={this.state.book.image} style={{width: 300, borderRadius: 10}} />
                    </Col>
                    <Col span={16} >
                        <h2>{this.state.book.title}</h2>
                        <p>Member: {this.state.book.member}</p>
                        <p>{this.state.book.description}</p>
                        {this.props.auth?editButton:""}


                    </Col>
                </Row>
            </div>

        ):(<div className="center">Loading...</div>);

        return (
            <Fragment>
                <div>
                    {book}
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth.isAuth
});



const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookExchangeDetail);


// export default connect(mapStateToProps)(BookDetail);

// export default BookDetail;

