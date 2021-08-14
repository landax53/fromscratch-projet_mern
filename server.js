const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path:'./config/.env'});
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
require('./config/db')
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors({corsOptions}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//jwt
app.get('*', checkUser); // pour n'importe quelle route, déclenche le middleware qui va vérifier que l'utilisateur correspond à un ID par son token 
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})
// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server 
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})