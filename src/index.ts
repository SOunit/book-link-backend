// import syntax for type support
import express from 'express';
import { json } from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { socketServer } from './socket';
import { router } from './routes/upload';
import { db, getSchema, associate } from './config';
import { createTestData } from './data';

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(json());

// route setup
app.use('/upload', router);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: getSchema(),
    // http://localhost:3050/api/graphql
    graphiql: true,
  }),
);

// socket
const server = socketServer(app);

// sequelize
associate();

// create table using model by sync command
db.sync({ force: false })
  .then(() => {
    // createTestData();

    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log('err in sync of sequelize', err);
  });
