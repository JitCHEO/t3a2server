const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function comparePassword(plainTextPassword, hashedPassword){
    let doesPasswordMatch = false
    doesPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword)
    return doesPasswordMatch
}

function generateJwt(userId) {
    let newJwt = jwt.sign(
        {
            userId
        },
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
    )

    return newJwt
}

//middleware to verify JWT
function verifyToken(request, response, next) {
    
    const token = request.headers.jwt

    console.log('Headers:', request.headers);

    if (!token) {
        return response.status(401).json({error: "Unauthorized"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return response.status(403).json({ error: 'Invalid token'})
        }

        request._id = decoded
        console.log(request._id)
        next()
    })
}

module.exports = {
    comparePassword,
    generateJwt,
    verifyToken
}