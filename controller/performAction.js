const User = require("../models/user");

const performAction = async(req, res) => {
    try {
        const key = req.headers['x-api-key'];
        // check if key exists
        await User.findOne({ where:{
            key: key
        }}).then(async (data) => {
            if(data && data.dataValues.counter <= data.dataValues.threshold) {
                await User.update({
                    counter: data.dataValues.counter + 1
                }, {
                    where: {
                        key: key
                    }
                }).then((data) => {
                    if(data) {
                        return res.status(200).send({
                            status: 'success',
                            message: 'Action performed successfully'
                        })
                    } else {
                        return res.status(400).send({
                            status: 'failure',
                            message: 'Error occurred'
                        })
                    }
                })
            } else {
                return res.status(403).send({
                    status: 'failure',
                    message: 'Forbidden'
                })
            }
        })
    } catch(error) {
        return res.status(500).send({
            status: 'failure',
            message: 'Internal Server Error'
        })
    }
}


module.exports = performAction;