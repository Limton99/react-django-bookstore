import React, { useState, useEffect } from "react";
import { Carousel, Card, Row, Col } from 'antd';
import ItemsCarousel from 'react-items-carousel';
import BookListItem from "../book-list-item";
import { connect } from "react-redux";
import {bookAddedToCart, fetchBooks} from "../../actions";
import {compose} from "../../utils";
import {withBookstoreService} from "../hoc";


function onChange(a, b, c) {
    console.log(a, b, c);
}

const { Meta } = Card;

const onMount = props => () => {
    props.fetchBooks()
}

const HomePage = (props) => {

    const {books, bookAddedToCart } = props;

    useEffect(onMount(props), []);

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;


    if(books.isPopular){

    }
    return (
        <div>
        <Carousel afterChange={onChange} autoplay>
            <div>
                <img className="slide" src="https://www.incimages.com/uploaded_files/image/970x450/getty_883231284_200013331818843182490_335833.jpg"/>
            </div>
            <div>
                <img className="slide" src="https://www.rd.com/wp-content/uploads/2017/10/This-Is-How-Long-It-Takes-To-Read-The-Whole-Dictionary_509582812-Billion-Photos_FB-e1574101045824.jpg"/>
            </div>
            <div>
                <img className="slide" src="https://anthology.com.ua/wp-content/uploads/2019/12/rey-seven-nm-mZ4Cs2I-unsplash_397351.jpg"/>
            </div>
            <div>
                <img className="slide" src="https://buro-akzent.ru/uploads/books/books_for_trainer.jpg"/>
            </div>
        </Carousel>
        <div style={{margin: 50}} className="itemCenter">
            <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={5}
                gutter={20}
                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {
                    books.map((book) => {
                        if(book.isPopular) {
                            return (
                                <li key={book.id}
                                    className="book-item">
                                    <BookListItem book={book} bookAddedToCart={() => bookAddedToCart(book.id)}/>
                                </li>
                            );
                        }
                    })
                }

            </ItemsCarousel>
        </div>
            <div className="approach">
                <h2>Our Approach</h2>
                <p>
                    Our farm strictly combines the traditions of organic farming with the latest innovations to make our products healthy and safe for the clients.
                </p>
                <button className="view">VIEW PRESENTATION</button>

            </div>

            {/*<div className="members"><h2>Team Members</h2></div>*/}

            <div className="site-card-wrapper container">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img src="https://cdn.onlinewebfonts.com/svg/img_469356.png"/>
                            }

                        >
                            <Meta
                                title="Aruzhan Myrzakhan"
                                description="This is the description"
                            />
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img src="https://cdn.onlinewebfonts.com/svg/img_469356.png"/>
                            }
                        >
                            <Meta
                                title="Zhanna Kozhabaieva"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img src="https://cdn.onlinewebfonts.com/svg/img_469356.png"/>
                            }

                        >
                            <Meta
                                title="Yeldar Limton"
                                description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>


        </div>
    );
};

const mapStateToProps = ({ bookList: { books, loading, error} }) => {
    return { books, loading, error }
};

const mapDispatchToProps = {
    fetchBooks,
    bookAddedToCart

    // onAddedToCart: (id) => dispatch(bookAddedToCart(id))


    // return bindActionCreators({
    //     booksLoaded
    // }, dispatch);
    // booksLoaded: (newBooks) => {
    //     dispatch(booksLoaded(newBooks));
    // }

};

export default compose(withBookstoreService(), connect(mapStateToProps, mapDispatchToProps))(HomePage);


// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);