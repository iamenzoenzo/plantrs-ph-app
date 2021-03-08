import { 
    SET_PLANTS, 
    LOADING_DATA, 
    LIKE_PLANT, 
    UNLIKE_PLANT,
    DELETE_PLANT, 
    SET_ERRORS,
    POST_PLANT,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_PLANT,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all plants
export const getPlants = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/plants')
        .then(res => {
            dispatch({
                type: SET_PLANTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_PLANTS,
                payload: []
            })
        })
};

export const getPlant = (plantId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/plant/${plantId}`)
        .then(res => {
            dispatch({
                type: SET_PLANT,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err));
}
// Post a plant
export const postPlant = (newPlant) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/plant', newPlant)
        .then((res) => {
            dispatch({
                type: POST_PLANT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Like a plant
export const likePlant = (plantId) => dispatch => {
    axios
        .get(`/plant/${plantId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_PLANT,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
};
// Unlike a plant
export const unlikePlant = (plantId) => dispatch => {
    axios
        .get(`/plant/${plantId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_PLANT,
                payload: res.data
            })
        })
        .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (plantId, commentData) => (dispatch) => {
    axios.post(`/plant/${plantId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}
// Delete a plant
export const deletePlant = (plantId) => (dispatch) => {
    axios.delete(`/plant/${plantId}`)
        .then(() => {
            dispatch({ type: DELETE_PLANT, paylod: plantId })
        })
        .catch((err) => console.log(err));
}

// Get user data and display plants
export const getUserData = (userHandle) => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_PLANTS,
                payload: res.data.plants
            });
        })
        .catch(() => {
            dispatch({
                type: SET_PLANTS,
                payload: null
            });
        });
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };