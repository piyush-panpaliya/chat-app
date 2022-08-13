import expressAsyncHandler from 'express-async-handler'
import { User, IUser } from '../models/User'
import { Response } from "express";
import ReqWithUser from '../types/ReqWithUser';

// @route   POST api/user/me
// @desc    Get current user
// @access  Private
export const me = expressAsyncHandler(async (req: ReqWithUser, res: Response, next) => {
	const user = await User.findById(req.user._id).select('-password').populate('friends', 'name username')
	.populate('sentFriendRequests', 'name username ')
	.populate('friendRequests', 'name username ')
	user.password = undefined
	res.status(200).json({
		user,
	})
})

// @route   PUT api/user/name
// @desc    Update current user name
// @access  Private
export const updateName = expressAsyncHandler(async (req: ReqWithUser, res: Response) => {
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
export const updatePassword = expressAsyncHandler(async (req: ReqWithUser, res: Response) => {
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
export const searchUser = expressAsyncHandler(async (req: ReqWithUser, res: Response) => {
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

// @route   POST api/user/:username
// @desc    Send friend request or accept friend request
// @access  Private
export const sendOrAcceptFriendRequest = expressAsyncHandler(async (req: ReqWithUser, res: any) => {
	const { username } = req.params
	const user = req.user
	const friend = await User.findOne<IUser>({ username })

	if (!friend) {
		res.status(404)
		throw new Error('User not found')
	}

	if (user._id.equals(friend._id)) {
		res.status(400)
		throw new Error('You can not add yourself as a friend')
	}

	if (user.friends.findIndex((f: any) => friend._id.equals(f)) !== -1) {
		res.status(400)
		throw new Error('You are already friends')
	}
	if (user.sentFriendRequests.findIndex((f: any) => friend._id.equals(f)) !== -1) {
		res.status(400)
		throw new Error('You have already sent a friend request to this user')
	}


	if (user.friendRequests.findIndex((f: any) => friend._id.equals(f)) !== -1) {
		user.friendRequests = user.friendRequests.filter((f: any) => !friend._id.equals(f))
		friend.sentFriendRequests = friend.sentFriendRequests.filter((f) => !user._id.equals(f))

		user.friends = [...user.friends, friend._id]
		friend.friends = [...friend.friends, user._id]

		await user.save()
		await friend.save()

		return res.status(200).json({
			message: 'Friend request accepted',
		})

	}

	user.sentFriendRequests = [...user.sentFriendRequests, friend._id]
	friend.friendRequests = [...friend.friendRequests, user._id]

	await user.save()
	await friend.save()

	res.status(200).json({
		message: 'Friend request sent',
	})

})

// @route DELETE api/user/:username
// @desc Unfriend or cancel friend request or reject friend request
// @access Private
export const unfriendOrCancelFriendRequest = expressAsyncHandler(
	async (req:ReqWithUser, res:any) => {
		const { username } = req.params

		const user = req.user

		const friend = await User.findOne({ username })

		if (!friend) {
			res.status(404)
			throw new Error('User not found')
		}

		if (user._id.equals(friend._id)) {
			res.status(400)
			throw new Error('You can not add or remove yourself as a friend')
		}

		// Check if friend
		if (user.friends.find((f:any) => friend._id.equals(f))) {
			user.friends = user.friends.filter((f:any) => !friend._id.equals(f))
			friend.friends = friend.friends.filter((f:any) => !user._id.equals(f))

			await user.save()
			await friend.save()

			return res.status(200).json({
				message: 'Unfriended',
			})
		}

		// Check if friend request already sent
		if (
			user.sentFriendRequests.findIndex((f:any) => friend._id.equals(f)) !==
			-1
		) {
			user.sentFriendRequests = user.sentFriendRequests.filter(
				(f:any) => !friend._id.equals(f)
			)

			friend.friendRequests = friend.friendRequests.filter(
				(f:any) => !user._id.equals(f)
			)

			await user.save()
			await friend.save()

			return res.status(200).json({
				message: 'Friend request cancelled',
			})
		}

		// Check if friend request received
		if (user.friendRequests.findIndex((f:any) => friend._id.equals(f)) !== -1) {
			user.friendRequests = user.friendRequests.filter(
				(f:any) => !friend._id.equals(f)
			)

			friend.sentFriendRequests = friend.sentFriendRequests.filter(
				(f:any) => !user._id.equals(f)
			)

			await user.save()
			await friend.save()

			return res.status(200).json({
				message: 'Friend request rejected',
			})
		}

		res.status(400)
		throw new Error('Requested action cannot be performed')
	}
)