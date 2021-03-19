const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

usersRouter.post('/', async(req, res) => {
    const { body } = req
    const { username, name, password } = body

    const passwordHash = await bcrypt.has(password, 10)

    const user = new User({
        username,
        name,
        passwordHash: password
    })

    const sevedUser = await user.save()

    res.json(sevedUser)
})

module.exports = usersRouter