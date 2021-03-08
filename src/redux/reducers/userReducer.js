import { 
    SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_PLANT, 
    UNLIKE_PLANT,
    MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function userReducer(state = initialState, action){
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_PLANT:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        plantId: action.payload.plantId
                    }
                ]
            };
        case UNLIKE_PLANT:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.plantId !== action.payload.plantId
                )
            };
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(noti => noti.read = true);
            return {
                ...state
            };
        default:
            return state;
    }
}