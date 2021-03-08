import { 
    SET_PLANTS,
    SET_PLANT, 
    LIKE_PLANT, 
    UNLIKE_PLANT, 
    LOADING_DATA, 
    DELETE_PLANT, 
    POST_PLANT,
    SUBMIT_COMMENT 
} from '../types';

const initialState = {
    plants: [],
    plant: {},
    loading: false
};

export default function dataReducer(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_PLANTS:
            return {
                ...state,
                plants: action.payload,
                loading: false
            };
        case SET_PLANT:
            return {
                ...state,
                plant: action.payload
            };
        case LIKE_PLANT:
        case UNLIKE_PLANT:
            let index = state.plants.findIndex((plant) => plant.plantId === action.payload.plantId);
            state.plants[index] = action.payload;
            if (state.plant.plantId === action.payload.plantId) {
                state.plant = action.payload;
            }
            return {
                ...state
            };
        case DELETE_PLANT:
            index = state.plants.findIndex((plant) => plant.plantId === action.payload);
            state.plants.splice(index, 1);
            return {
                ...state
            };
        case POST_PLANT:
            return {
                ...state,
                plants: [
                    action.payload,
                    ...state.plants
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                plant: {
                    ...state.plant,
                    comments: [action.payload, ...state.plant.comments]
                }
            };
        default:
            return state;
    }
}