import React from 'react';
import axios from 'axios'
import cookie from 'js-cookie'; //npm i js-cookie : pour retirer le cookie en front au logout

const Logout = () => {

    const removeCookie = (key) => { //key sera la clé du cookie ('jwt')
        if (window !== "undefined") { //si il se passe quelque chose dans la fenêtre
            cookie.remove(key, {expires: 1})
        }
    };

    const logout = async () => { //on retire en back et en front le cookie
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`, //on va chercher la fonction logout (définit en back >controller/authController) qui permet de retirer le cookie dans le back
            withCredentials: true,
        })
        .then(() => removeCookie('jwt')) //on retire le cookie dans le front
        .catch((err) => console.log(err))

        window.location = "/"  //on le redirige vers la page d'accueil et on checkUser à la fin pour savoir si il a son id
    }

    return (
        <div>
            <li onClick={logout}>
                <img src="./img/icons/logout.svg" alt="logout" />
            </li>
        </div>
    );
};

export default Logout;