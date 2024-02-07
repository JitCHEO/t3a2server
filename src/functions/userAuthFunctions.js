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
            user_id
        },
        process.env.SECRET_KEY,
        {expiresIn: "7d"}
    )

    return newJwt
}

module.exports = {
    comparePassword,
    generateJwt
}