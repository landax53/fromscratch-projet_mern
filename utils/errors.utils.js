module.exports.signUpErrors = (err) => { //erreurs d'enregistrement
    let errors = { pseudo: '', email: '', password:'' }
    if (err.message.includes('pseudo')) //le message contient le mot 'pseudo'
        errors.pseudo = "Pseudo incorrect ou déjà pris";
    
    if (err.message.includes('email')) //le message contient le mot 'email'
        errors.email = "Email incorrect";
    
    if (err.message.includes('password')) //le mdp est trop court
        errors.password = "Le mot de passe doit faire plus de 6 caractères minimum";
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) //email déjà enregistré
        errors.email = "Ce pseudo est déjà pris";
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) //email déjà enregistré
        errors.email = "L'email est déjà enregistré";
    return errors
};

module.exports.signInErrors = (err) => {   // erreurs de connexion
    let errors = { email:"", password: "" }
    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

    return errors
};

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize:''};

    if (err.message.includes('invalid file'))
    errors.format = 'Format incompatible';

    if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500ko';

    return errors
}