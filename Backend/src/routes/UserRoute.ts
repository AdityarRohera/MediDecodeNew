
import express from 'express';
import * as UserController from '../controller/UserControler.js';
const UserRoute = express.Router();
import { userAuth } from '../middlewares/auth.js';


UserRoute.post('/register' , UserController.signup);
UserRoute.post('/login' , UserController.login);
UserRoute.post('/logout' , UserController.logout);

UserRoute.get('/profile' , userAuth , UserController.userProfile);

export default UserRoute;