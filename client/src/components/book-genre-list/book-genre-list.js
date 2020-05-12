import React, {Component} from "react";

import {fetchBooksGenre, filterBooksGenre} from "../../actions";
import {connect} from "react-redux";

class BookGenreList extends Component {


    componentDidUpdate() {
        this.props.fetchBooksGenre();


    }

    render() {
        const { genre } = this.props;

        const onSearch = (id) => {
            console.log(id)
            this.props.filterBooksGenre(id)

        }

        return (
            <div>
                {
                genre.map((item) => {
                    return (
                        <li key={item.id}
                            className="book-item" style={{margin: 10}}>
                            <input style={{background: "none", border: "none"}} type="button" value={item.name} onClick={() => onSearch(item.id)}/>


                        </li>
                    );
                })
                }
            </div>
        )
    }
}


const mapStateToProps = ({ genreList: { genre } }) => {
    return { genre }
};



const mapDispatchToProps = {
    fetchBooksGenre,
    filterBooksGenre
};




export default connect(mapStateToProps, mapDispatchToProps)(BookGenreList);
