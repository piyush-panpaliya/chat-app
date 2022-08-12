import expressAsyncHandler from 'express-async-handler'
import { User} from '../models/User'
import  {  Response } from "express"; 
import ReqWithUser from '../types/ReqWithUser';
// @route   POST api/user/me
// @desc    Get current user
// @access  Private
export const me = expressAsyncHandler(async (req:ReqWithUser, res:Response, next) => {
    const user = await User.findById(req.user._id).select('-password')
    user.password = undefined
    res.status(200).json({
        user,
    })
})

// @route   PUT api/user/name
// @desc    Update current user name
// @access  Private
export const updateName = expressAsyncHandler(async (req:ReqWithUser, res:Response) => {
    const { name } = req.body

    const user = req.user

    user.name = name

    await user.save()

    res.status(200).json({
        message: 'Name updated successfully',
    })
})

// @route   PUT api/user/password
// @desc    Update current user password
// @access  Private
export const updatePassword = expressAsyncHandler(async (req:ReqWithUser, res:Response) => {
    const { oldPassword, newPassword } = req.body

    const user = req.user

    if (!user.comparePassword(oldPassword)) {
        res.status(400)
        throw new Error('Incorrect old password')
    }

    user.password = newPassword

    await user.save()

    res.status(200).json({
        message: 'Password updated successfully',
    })
})


// @route  GET api/user/search?q=:query
// @desc   Search users by username or name
// @access Private
export const searchUser = expressAsyncHandler(async (req:ReqWithUser, res:Response) => {
    let { q, page, limit } = req.query as any
    
    q = q.trim()

    if (!q) {
        res.status(400)
        throw new Error('Query is required')
    }

    if (!page) {
        page = 1
    }

    if (!limit) {
        limit = 10
    }

    const users = await User.find({
        $or: [
            { username: { $regex: q, $options: 'i' } },
            { name: { $regex: q, $options: 'i' } },
        ],
    })
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit)
        .select('name username')

    res.status(200).json({
        users,
    })
})


