const intialState = {
    products:[]
}

export const productReducer = (state = intialState, {type, payload}) =>{
    switch(type){
        case "PRODUCT_LIST":
            state = {...state, products: payload}
            return state
            break;

        case "UPDATE_PRODUCT":
            return {...state, products:[...state.products.filter((product) => product.id !== payload.id
                )]}

            break;

        case "DELETE_PRODUCT":
            return {...state, products:[...state.products.filter((product) => product.id !== payload.id
                )]}
            break;
        default:
            return state
    }
}