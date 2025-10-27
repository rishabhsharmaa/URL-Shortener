const errorHandler = (err, req, res,next)=>{
    let statusCode = err.statusCode || res.statusCode || 500;

    if (err.name==='castError'&& err.kind==='ObjectId'){
        statusCode=404;
        err.message='Resource not found with the given id';
    }
    console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
}

export default errorHandler;