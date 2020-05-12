const updateGenreList = (state, action) => {

    if (state === undefined) {
        return {
            genre: [],

        };
    }

    switch (action.type) {
        case 'FETCH_GENRE_SUCCESS':
            return {
                genre: action.payload,
            };


        default:
            return state.genreList;
    }
};

export default updateGenreList;
