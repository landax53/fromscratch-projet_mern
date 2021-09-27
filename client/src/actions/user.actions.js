import axios from "axios";

//table de matières des actions qui sera envoyée au reducer
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

export const getUser = (uid) => {
  return (dispatch) => {
    //les données du dispatch seront envoyées au reducer
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data }); //toute la data qu'on est allé GET on la passe au reducer avec la méthode 'dispatch'
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    //on envoie au reducer les choses suivantes
    return axios // on envoie d'abord la data à la bdd
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data) //le backend va ainsi créer un fichier dans public>uploads>profil(il s'agit de la data provenant du component UploadImg.js)
      .then((res) => {
        //on va ensuite avertir le reducer pour qu'il change le store en conséquence
        return axios //on va chercher le nom de la sauvegarde correspondant à ce qui a été ajouté à la bdd
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`) //on récupère le chemin de l'image
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture }); //on va dispatcher au reducer le type de l'action, et la data la picture et le nouveau chemin de l'utilisateur dans le store
          });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {};
