import express from 'express';
import session from 'express-session';
import envConfig from './config/dotenv.js';
import db from './config/db.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = envConfig.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'emsProFlashSecret',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.success_msg = req.session.success_msg || null;
    res.locals.error_msg = req.session.error_msg || null;
    delete req.session.success_msg;
    delete req.session.error_msg;
    next();
});

app.use(router);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Server Started');
        console.log(`http://localhost:${PORT}`);
    }
});