const intialState = {
    entree:[]
}

export const entreeReducer = (state=intialState, {type, payload}) =>{
    switch(type){
        case "ENTREE_LIST":
            state = {...state, entree:payload}
            return state
            break;

        case "ADD_ENTREE":
            state = {...state, entree:payload}
            return state
            break;
        case "UPDATE_ENTREE":
            return {...state, entree:[...state.entree.filter((entry) => entry.id !== payload.id
              )]}
        case "DELETE_ENTREE":
            return {...state, entree:[...state.entree.filter((entry) => entry.id !== payload.id
                )]}
        default:
            return state
    }
}