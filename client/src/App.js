import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch(); // hook utile pour faire l'action d'aller chercher la data gràce à la méthode hook

  useEffect(() => {
    //se lance à chaque fois que App.js est appelé
    const fetchToken = async () => {
      axios({
        //à chaque requête get, si un token 'jwt' est disponible, on va récupérer l'id de l'utilisateur correspondant au token décodé par requireAuth (cf. authmiddleware.js)
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          //on renvoie l'id de l'utilisateur
          console.log(res);
          setUid(res.data); //on change la valeur de l'uid
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid)); //dispatch déclenche l'action getUser qui va aller chercher la data et l'afficher dans le store
  }, [uid, dispatch]); //on a l'id de l'utilisateur dans notre contexte (qui sera dans le state de App.js)

  return (
    <UidContext.Provider value={uid}>
      {/*component qui créé un contexte permettant de fournir le UserId sans avoir besoin de le redemander au serveur */}
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
