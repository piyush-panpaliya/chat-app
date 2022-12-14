import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Document } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

export interface IUser extends Document  {
    name: string;
    username: string;
    password: string;
    author: string;
    generateAccessToken():string;
    comparePassword(userPassword:string):boolean;
}



const UserSchema:Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

UserSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    next()
})

UserSchema.methods.generateAccessToken = function () {
    const user = this
    const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '90d' } // 3 months
    )

    return accessToken
}

UserSchema.methods.comparePassword = function (userPassword:any) {
    return bcrypt.compareSync(userPassword, this.password)
}

UserSchema.virtual('pomodoros', {
    ref: 'Pomodoro',
    localField: '_id',
    foreignField: 'user',
})

UserSchema.virtual('breaks', {
    ref: 'Break',
    localField: '_id',
    foreignField: 'user',
})

export const User = mongoose.model<IUser >('User', UserSchema)
