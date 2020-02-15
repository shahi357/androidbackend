const app= module.exports= require('express')();
const userController= require('../controllers/user')

app.post('/register', userController.RegisterUser);
app.post('/login', userController.LoginUser);
app.put('/update', userController.UpdateUser);