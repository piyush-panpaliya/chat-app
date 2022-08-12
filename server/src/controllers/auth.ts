import expressAsyncHandler from 'express-async-handler'
import { User } from '../models/User'


// @route   POST api/auth/register
// @desc    Register user
// @access  Public
export const register = expressAsyncHandler(async (req, res) => {
    const { name, username, password } = req.body

    const usernameExists = await User.findOne({ username })

    if (usernameExists) {
        res.status(400)
        throw new Error('Username already taken')
    }

    const user = await User.create({
        name,
        username,
        password,
    })

    const accessToken = user.generateAccessToken()

    user.password = undefined

    res.status(201).json({
        user,
        accessToken,
    })
})

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
export const login = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const isValidPassword = user.comparePassword(password)

    if (!isValidPassword) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    const accessToken = user.generateAccessToken()

    user.password = undefined

    res.json({
        user,
        accessToken,
    })
})
