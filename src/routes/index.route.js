import postRouter from './post.route.js';
import taskRouter from './task.route.js';
import siteRouter from './site.route.js';
import userRouter from  './user.route.js';

const route = (app) => {
    app.use('/posts', postRouter); 
    app.use('/tasks', taskRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

export default route;