const jwt = require('jsonwebtoken')

exports.authentication = async (req, res, next) => {

    try {
        let token =req.headers['authorization']

        token = slice(0, 7)

        jwt.verify(token, 'keys', function (err, decode) {
            if (err) {
                return res.status(401).send({ status: false, message: "token is invalid" })
            } else {
                next()
            }
        })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}