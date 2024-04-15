import express from 'express';
import { engine } from 'express-handlebars';
import route from './routes/index.route.js';
import connection from './config/db/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.engine('handlebars', engine({}));
app.set('view engine', 'handlebars');
app.set('views', './src/resources/views');

route(app);

app.listen(3000);