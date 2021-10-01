import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch(); //permet de déclencher l'action correspondante
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData(); //formdata est un objet qui va permettre de mettre dans un package l'image + des infos qui seront ensuite envoyées
    data.append("name", userData.pseudo); //on attache à data : clé sera "name" et le nom de l'image sera le pseudo de l'utilisateur
    data.append("userId", userData._id); //on attache à data : clé sera l'id de l'utilisateur et l'élément sera l'id
    data.append("file", file); //on attache à data : la clé: "file" et le file en question

    dispatch(uploadPicture(data, userData._id)); //on déclenche l'action uploadPicture avec toute la data, et userid en paramètre qui sera nécessaire dans l'action
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input /*dans le back, on dit à multer que l'on va recevoir un fichier dont le name ="file" */
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])} //on met dans une variable 'file' l'élément mit dans l'input
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
