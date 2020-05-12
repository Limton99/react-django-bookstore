const updateSellerList = (state, action) => {

    if (state === undefined) {
        return {
            seller: [],

        };
    }

    switch (action.type) {
        case 'FETCH_SELLER_SUCCESS':
            return {
                seller: action.payload,
            };


        default:
            return state.sellerList;
    }
};

export default updateSellerList;
