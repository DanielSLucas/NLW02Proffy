import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';
import ResetPasswordController from './controllers/ResetPasswordController';
import ScheduleController from './controllers/ScheduleController';
import ProfileController from './controllers/ProfileController';


const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();
const resetPasswordController = new ResetPasswordController();
const scheduleController = new ScheduleController();
const profileController = new ProfileController();


routes.post('/forgot-password', resetPasswordController.create);
routes.patch('/reset-password', resetPasswordController.update);

routes.post('/users', usersController.create);
routes.post('/sessions', sessionsController.create);
routes.get('/connections', connectionsController.index);


routes.use(ensureAuthenticated);

routes.get('/logged-user', usersController.show);
routes.put('/profile', profileController.update);

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);
routes.delete('/schedule-item/:id', scheduleController.delete);

routes.post('/connections', connectionsController.create);

export default routes;
