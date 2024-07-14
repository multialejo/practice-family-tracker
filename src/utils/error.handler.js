import config from '../../config/index.js';
import AppError from './appError.js';

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    res.status(err.statusCode).render('error.ejs', {
      error: err,
      message: err.message,
      stack: err.stack,
    });
    console.log('Error: ', {
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (config.env === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (!error.isOperational) {
      error = new AppError('Something went wrong!', 500);
    }

    res.status(error.statusCode).render('error.ejs', {
      error,
      message: error.message,
    });
  }
};

export default errorHandler;
