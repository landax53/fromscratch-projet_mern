import React, { useContext } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';


const NavBar = () => {
    const uid = useContext(UidContext) //on se récupère l'id de l'utilisateur contenu dans le contexte
    const userData = useSelector((state) => state.userReducer) //on récupère la data de l'utilisateur en cherchant la data dans userReducer

    
    return (
<nav>
    <div className="nav-container">
        <div className="logo">
            <NavLink exact to="/"> {/*en cliquant sur le logo le chemin nous ramènera à l'accueil*/}
                <div className="logo">
                    <img src="./img/icon.png" alt="icon" />
                    <h3>Raccount</h3>
                </div>
            </NavLink>
        </div>
    
    {uid ? (
        <ul>
            <li></li>
            <li className="welcome">
                <NavLink exact to="/profil">
                    <h5>Bienvenue {userData.pseudo}</h5>
                </NavLink>
            </li>
            <Logout />
        </ul>
    ) : (
        <ul>
            <li></li>
            <li>
                <NavLink exact to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
                </NavLink>
            </li>
        </ul>
    )}
    </div>
</nav>
    );
};

export default NavBar;