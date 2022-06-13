const User = require("../models/user");

const getUsers = async (req, res) => {
    try {
        const userData = await User.findAll({
            where: {},
            attributes: ['username', 'key', 'threshold', 'counter'],
            raw: true
        });
    
        if(userData.length > 0) {
            return res.status(200).send({
                status: 'success',
                message: 'Data retrieved successfully',
                data: userData
            })
        } else {
            return res.status(403).send({
                status: 'failure',
                message: 'No data found',
            })
        }
    } catch (error) {
        return res.status(500).send({
          status: "failure",
          message: "Internal Server Error",
        });
    }
    
}

module.exports = getUsers;