import express from 'express';

import ordersRouter from './routes/orders.js';

const app = express();
app.use(express.json());

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
