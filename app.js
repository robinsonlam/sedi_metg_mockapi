import express from 'express';
import basicAuth from 'express-basic-auth';

import ordersRouter from './routes/orders.js';

// ! Mock Server Setup
import { handlers } from './mocks/handlers'
import { createMiddleware } from '@mswjs/http-middleware';

const app = express();
app.use(express.json());

app.use(basicAuth({
  users: { 'admin': 'password' },
}))

// ! Mock Service Worker Middleware
// ! Added an env var for only dev env
// if (process.env.NODE_ENV === 'development') {
app.use(createMiddleware(...handlers))
// }

app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({
    status: 404,
    message: 'Not Found',
    expose: true
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.expose ? err.message : 'Internal Server Error',
    error: err
  });
});

export default app;
