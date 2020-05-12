import React, {Component, Fragment} from "react";
import {Row, Col} from 'antd'
import { connect } from "react-redux";
import axios from "axios";
import {bookAddedToCart, fetchBooks} from "../../actions";
import {withRouter} from 'react-router-dom'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class BookDetail extends Component{

    state = {
        book: null,
        comments: null
    }



    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get('/api/v1/shop/detail/' + id)
            .then(res => {
                this.setState({
                    ...this.state,
                    book: res.data
                })
            })


    }

    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: this.props.username,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };


    render() {
        const { onAddedToCart } = this.props;

        const { comments, submitting, value } = this.state;

        const addButton = (<button onClick={() => onAddedToCart(this.state.book.id)} className="btn btn-info add-to-cart">Add to cart</button>);

        console.log(this.state.book);
        const book = this.state.book ? (
            <div style={{margin: 50}}>
                <Row>
                    <Col span={8} >
                        <img src={this.state.book.image} style={{width: 300, borderRadius: 10}} />
                    </Col>
                    <Col span={16} >
                        <h2>{this.state.book.title}</h2>
                        <p>Price: ${this.state.book.price}</p>
                        <p>Author: {this.state.book.author}</p>
                        <p>{this.state.book.description}</p>
                        {this.props.auth?addButton:""}
                    </Col>
                </Row>
                    <div>
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </div>
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
    username: state.auth.username,
    auth: state.auth.isAuth
});



const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetail));


// export default connect(mapStateToProps)(BookDetail);

// export default BookDetail;

