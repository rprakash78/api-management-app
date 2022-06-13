const verifyHeader = (req, res, next) => {
    if(req.headers["x-api-key"]) {
        return next();
    } else {
        return res.status(403).send({
            status: 'failure',
            message: 'forbidden'
        }) 
    }
}


module.exports = verifyHeader;