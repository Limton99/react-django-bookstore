import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import { Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {fetchBooksGenre, fetchBooksSeller, saveBook} from "../../actions";
import {connect} from 'react-redux'

class Misc extends Component {
    state = {
        data: {
            title: '',
            description: '',
            price: '',
            members: '',
            author: '',
            genre: null,
            seller: null,
            image: null
        },
        loading: true,
        imageload: false,
        error: false,
        imageUrl: ``
    }


    componentDidMount() {
        this.props.fetchBooksGenre()
        this.props.fetchBooksSeller()

        axios.get('/api/v1/shop/detail/' + this.props.match.params.id)
            .then(res => {
                const data = res.data; // get the data array instead of object
                this.setState({ data, loading: false });
                console.log(data);
            })
            .catch(err => { // log request error and prevent access to undefined state
                this.setState({ loading: false, error: true });
                console.error(err);
            })
    }


    render() {
        const {genre, seller} = this.props


        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        function beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        }

        const handleChange = (e) => {
            console.log(e.target.value)
            this.setState({
                data: {...this.state.data, [e.target.name]: e.target.value}
            })
        }

        const categoryChange = value => {
            console.log(value)
            this.setState({
                data: {...this.state.data, genre: value}
            })
        }

        const sellerChange = value => {
            console.log(value)
            this.setState({
                data: {...this.state.data, seller: value}
            })
        }



        const uploadButton = (
            <div>
                {this.state.imageload ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const fileChange = info => {
            console.log(info)
            if (info.file.status === 'uploading') {
                this.setState({
                    imageload: true
                })
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl => {
                    this.setState({
                        imageload: false,
                        imageUrl: imageUrl
                    })
                });
                this.setState({data: {...this.state.data, image: info.file.originFileObj}})
            }
        }

        const handleOk = (e) => {
            const fm = new FormData()
            Object.keys(this.state.data).map(key => {
                fm.append([key],this.state.data[key])
            })
            console.log(fm)
            console.log(this.state.data)
            axios.put('/api/v1/shop/detail/' + this.props.match.params.id, fm, {
                headers: {
                    "Content-type": undefined
                }})
                .then(res => {
                    console.log(res.data)


                })
                .catch(err => console.log(err))

            // e.preventDefault();
        };

        const onFinish = values => {
            console.log(values);
        };

        if (this.state.loading) {
            return(
                <div>
                    <p> Loading... </p>
                </div>
            )
        }
        if (this.state.error || !this.state.data) { // if request failed or data is empty don't try to access it either
            return(
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
            <form onSubmit={handleOk}>
                <h2 className="center" >Change data</h2>
                <h5>Title:</h5>
                <input type="text" name="title" value={ this.state.data.title } onChange={handleChange}/>
                <h5>description:</h5>
                <input type="text" name="description" value={ this.state.data.description } onChange={handleChange} />
                <h5>Price:</h5>
                <input type="text" name="price" value={ this.state.data.price } onChange={handleChange}/>
                <h5>Member:</h5>
                <input type="text" name="member" value={ this.state.data.member } onChange={handleChange}/>

                <h5>Author:</h5>
                <input type="text" name="author" value={ this.state.data.author } onChange={handleChange}/>
                <Select onChange={categoryChange} name="genre">
                    {genre.map(item => (<option value={item.id}>{item.name}</option>))}
                </Select>
                <Select onChange={categoryChange} name="seller">
                    {seller.map(item => (<option value={item.id}>{item.username}</option>))}
                </Select>

                <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={fileChange}
                >
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>

                <input type="submit" className="btn-large waves-effect waves-light xbutton" value="Save"/>
            </form>



        );
    }
}


const mapStateToProps = ({ genreList: { genre }, sellerList: {seller}} ) => {
    return { genre, seller }
};



const mapDispatchToProps = {
    fetchBooksSeller,
    fetchBooksGenre,
    saveBook


    // onAddedToCart: (id) => dispatch(bookAddedToCart(id))


    // return bindActionCreators({
    //     booksLoaded
    // }, dispatch);
    // booksLoaded: (newBooks) => {
    //     dispatch(booksLoaded(newBooks));
    // }

};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Misc));