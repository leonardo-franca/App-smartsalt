import { SALTERN_SELECT } from "../actions/salternactions";
const INITIAL_STATE = {
    saltern: {
        name: 'Selecionar',
        latitude: '-5.1167',
        longitude: '-36.6624'
    }
}

const salternReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SALTERN_SELECT: {
            return {
                ...state,
                saltern: action.payload.saltern
            }
        }
        default: {
            return state;
        }
    }
}
export default salternReducer;