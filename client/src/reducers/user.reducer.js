import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {}; //state de base vide que l'on remplira une fois seulement de data à partir de la bdd, que l'on aura plus besoin de l'appeler ensuite

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload; //si on est dans le case GET_USER, on incrémente l'initialState de la data données par 'user.action.js'
    case UPLOAD_PICTURE:
      return {
        ...state, //on récupère la donnée de state sans l'écraser
        picture: action.payload, // on va seulement changer la donnée de picture avec ce qui est contenu dans payload
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
