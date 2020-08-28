import express from 'express';
import cors from 'cors';
import routes from './routes';
import uploadConfig from './config/upload';

const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333);
