import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


import { connect } from 'react-redux'
import {fetchBooksGenre, saveBook, fetchBooksSeller} from "../actions";
import {compose} from "../utils";
import {withBookstoreService} from "./hoc";
const {Option} = Select

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

const onMount = props => () => {
    props.fetchBooksGenre()
    props.fetchBooksSeller()

}

// function randomInteger(min, max) {
//     // получить случайное число от (min-0.5) до (max+0.5)
//     let rand = min - 0.5 + Math.random() * (max - min + 1);
//     return Math.round(rand);
// }

function ModalBook(props) {
    const {modalBlogVisible, close } = props
    const [visible, setVisible] = useState(modalBlogVisible)
    const [imageUrl, setImageUrl] = useState(``)
    const [loading, setLoading] = useState(false)
    const {genre, seller} = props
    const [formData, setFormData] = useState({
        title: ``,
        description: ``,
        price: 0,
        member: ``,
        author: ``,
        genre: null,
        image: null,
        seller: null
    })

    useEffect(() => {
        setVisible(modalBlogVisible)
    }, [modalBlogVisible])



    useEffect(onMount(props), [])



    const handleOk = () => {
        props.saveBook(formData)

        close();
    };

    const onFinish = values => {
        console.log(values);
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const handleChange = e => {
        console.log(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const categoryChange = value => {
        console.log(value)
        setFormData({...formData, genre: value})
    }

    const sellerChange = value => {
        console.log(value)
        setFormData({...formData, seller: value})
    }



    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const fileChange = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false);
                setImageUrl(imageUrl)
            });

            setFormData({...formData, image: info.file.originFileObj})
        }
    }


    return (
        <Modal
            title="Add Book"
            visible={visible}
            onOk={handleOk}
            onCancel={close}
        >

            <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['book', 'title']} label="Title" rules={[{ required: true }]}>
                    <Input name="title" value={formData.title} onChange={handleChange}/>
                </Form.Item>



                <Form.Item name={['book', 'description']} label="Description">
                    <Input.TextArea name="description" value={formData.description} onChange={handleChange}/>
                </Form.Item>



                <Form.Item name={['book', 'price']} label="Price" rules={[{ required: true }]}>
                    <Input name="price" value={formData.price} onChange={handleChange} />
                </Form.Item>

                <Form.Item name={['book', 'member']} label="Member" rules={[{ required: true }]}>
                    <Input name="member" value={formData.member} onChange={handleChange} />
                </Form.Item>

                <Form.Item name={['book', 'author']} label="Author" rules={[{ required: true }]}>
                    <Input name="author" value={formData.author} onChange={handleChange} />
                </Form.Item>

                <Form.Item name={['book', 'genre']} label="Genre">
                    <Select onChange={categoryChange} name="genre">
                        {genre.map(item => (<Option value={item.id}>{item.name}</Option>))}
                    </Select>
                </Form.Item>

                <Form.Item name={['book', 'seller']} label="Seller">
                    <Select onChange={sellerChange} name="seller">
                        {seller.map(item => (<Option value={item.id}>{item.username}</Option>))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={fileChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>

            </Form>

        </Modal>
    );
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

export default compose(withBookstoreService(), connect(mapStateToProps, mapDispatchToProps))(ModalBook);


