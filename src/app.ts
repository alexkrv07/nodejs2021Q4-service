import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/boards/boards.router';
import { StatusCode } from './common/constants';

const app: express.Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.error(err.stack);
  res
    .status(StatusCode.InternalServerError)
    .send({error: `${err.message}`});
  next();
});

export default app;
