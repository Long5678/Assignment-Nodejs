import authRouter from './auth.route.js';
import siteRouter from './site.route.js';
import Auth from '../app/helpers/Auth.js';

const route = (app) => {
    app.use('/auth', authRouter);
    app.use('/', Auth.verifyJWTToken, siteRouter);
}

export default route;