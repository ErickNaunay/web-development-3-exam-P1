const axios = require("axios");

let API_URL;

API_URL = "http://localhost:3000";

if (process.env.NODE_ENV === "production") {
  console.log("PPRRROOOOD")
  API_URL = "https://examen-erick-naunay.herokuapp.com";
}

const addUser = (req, res) => {
  addUserPath = `api/v1/users`;
  axios
    .post(`${API_URL}/${addUserPath}`, {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      direccion: req.body.direccion,
      edad: req.body.edad,
      telefono: req.body.telefono,
    })
    .then((response) => {
      console.log("User created");
      console.log(response);
      res.redirect(`${API_URL}/addUser`);
    })
    .catch((error) => {
      res.render("error", {
        message: "Error creating user",
        error,
      });
    });
};

const changeUser = (req, res) => {
  changeUserPath = `api/v1/users`;
  axios
    .put(`${API_URL}/${changeUserPath}/${req.params.id}`, {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      direccion: req.body.direccion,
      edad: req.body.edad,
      telefono: req.body.telefono,
    })
    .then((response) => {
      console.log("User updated");
      console.log(response.data);
      res.redirect(`${API_URL}/changeUser`);
    })
    .catch((error) => {
      res.render("error", {
        message: "Error updating user",
        error,
      });
    });
};

const getUserInfo = (req, res) => {
  res.redirect(`${API_URL}/changeUser/${req.body.id}`);
};

const updateUserPage = (req, res) => {
  getUserInfoPath = `api/v1/users/${req.params.id}`;

  axios.get(`${API_URL}/${getUserInfoPath}`).then((response) => {
    console.log(response.data);
    res.render("changeUser", {
      id: req.params.id,
      nombre: response.data.nombre,
      apellido: response.data.apellido,
      direccion: response.data.direccion,
      edad: response.data.edad,
      telefono: response.data.telefono,
    });
  });
};

module.exports = {
  addUser,
  changeUser,
  getUserInfo,
  updateUserPage,
};
