const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    console.log(`Error message: ${err.message || undefined}`);

    res.status(500).json({ error: err.message || 'Something went wrong!' });
};

export { errorHandler }