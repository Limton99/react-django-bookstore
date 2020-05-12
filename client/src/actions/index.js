import axios from 'axios';


// const booksLoaded = (newBooks) => {
//     return {
//         type: 'FETCH_BOOKS_SUCCESS',
//         payload: newBooks
//     };
// };
// const booksRequested = () => {
//     return {
//         type: 'FETCH_BOOKS_REQUEST'
//     };
// };

// const booksError = (error) => {
//     return {
//         type: 'FETCH_BOOKS_FAILURE',
//         payload: error
//     };
// };

export const bookAddedToCart = (bookId) => {
  return {
      type: 'BOOK_ADDED_TO_CART',
      payload: bookId
  }
};

export const bookRemovedToCart = (bookId) => {
  return {
      type: 'BOOK_REMOVED_FROM_CART',
      payload: bookId
  }
};
export const allbookRemovedToCart = (bookId) => {
  return {
      type: 'ALL_BOOKS_REMOVED_FROM_CART',
      payload: bookId
  }
};

const fetchBooks = () => (dispatch) => {
    axios.get('/api/v1/shop/list/').then(res => {
        // console.log(res, res.data)
        dispatch({
            type: 'FETCH_BOOKS_SUCCESS',
            payload: res.data
        })
    }).catch(err => console.log(err))
}

const fetchBooksGenre = () => (dispatch) => {
    axios.get('/api/v1/shop/genre/list/').then(res => {
        // console.log(res, res.data)
        dispatch({
            type: 'FETCH_GENRE_SUCCESS',
            payload: res.data
        })
    }).catch(err => console.log(err))
}




export const fetchBooksDetail = (id) => dispatch => {
    axios.get('/api/v1/shop/detail/' + id)
        .then(res => {
            dispatch({
                type: 'FETCH_DETAIL_SUCCESS',
                payload: res.data
            })
        })
}

export const fetchBooksSeller = () => (dispatch) => {
    axios.get('/api/user/list').then(res => {
        // console.log(res, res.data)
        dispatch({
            type: 'FETCH_SELLER_SUCCESS',
            payload: res.data
        })
    }).catch(err => console.log(err))
}
export const saveBook = data => dispatch =>{
    console.log(data)
    const fm = new FormData()
    Object.keys(data).map(key => {
        fm.append([key],data[key])
    })
    console.log(fm.get('title'))


    axios.post('/api/v1/shop/create/', fm, {
        headers: {
            "Content-type": undefined
        }})
        .then(res => {
            console.log(res.data)

            dispatch({
                type: 'FETCH_BOOK_ADD',
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};



export const signUp = (user) => dispatch =>{
    console.log(user)
    axios.post('/api/signup', user)
        .then(res => {
            console.log("Response: ", res.data)
            dispatch({
                type: 'USER_SIGNIN',
            })

            setTimeout(() => {
                dispatch({
                    type: 'USER_SIGNUP',
                })
            }, 1000)

        })
        .catch(err => {
            // console.log(err.message)
            dispatch({
                type: 'ERROR_HANDLE',
                payload: err.response.data
            })
        })

};


export const logIn = (user) => dispatch =>{
    console.log(user)
    axios.post('/api/login', user)
        .then(res => {
            localStorage.setItem('access_token', res.data.access)
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.access
            })
        })
        .catch(err => {
            // console.log(err.message)
            dispatch({
                type: 'ERROR_HANDLE',
                payload: err.response.data
            })
        })
};

export const logOut = () => dispatch =>{
    dispatch({
        type: 'USER_LOGOUT'
    })
};


export const deleteArticle = (id) => dispatch =>{
    axios.delete('/api/v1/shop/detail/' + id)
        .then(res => {
            dispatch({
                type: 'DELETE_BOOK',
                payload: id
            })
        })
        .catch(err => console.log(err))
};

export const getMyArticles = () => dispatch =>{
    axios.get('/api/v1/shop/user/books')
        .then(res => {
            console.log("Response: ", res, res.data)
            dispatch({
                type: 'FETCH_BOOKS_SUCCESS',
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};


export const filterBooks = (query) => dispatch =>{
    axios.get(`/api/v1/shop/list/filter/${query}/`)
        .then(res => {
            console.log("Response: ", res, res.data)
            dispatch({
                type: 'FETCH_BOOKS_SUCCESS',
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};


export const filterBooksGenre = (query) => dispatch =>{
    axios.get(`/api/v1/shop/list/genre/filter/${query}/`)
        .then(res => {
            console.log("Response: ", res, res.data)
            dispatch({
                type: 'FETCH_BOOKS_SUCCESS',
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};




export const setError = (err) => dispatch =>{
    dispatch({
        type: "ERROR_HANDLE",
        payload: {}
    })
};





export {
  fetchBooks, fetchBooksGenre
};