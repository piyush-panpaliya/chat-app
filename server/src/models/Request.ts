import { Document } from 'mongodb';
import mongoose, { Schema } from 'mongoose'

export interface IFRequest extends Document  {
    name: string;
    username: string;
    password: string;
    author: string;
    generateAccessToken():string;
    comparePassword(userPassword:string):boolean;
}



const FReqSchema:Schema = new mongoose.Schema(
    {
        IUser: {
            type: String,
            required: true,
        },
        OUser: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            required: true,
            default: 'pending',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

FReqSchema.methods.comparePassword = function (userPassword:any) {
    return bcrypt.compareSync(userPassword, this.password)
}


export const FRequest = mongoose.model<IFRequest >('FRequest', FReqSchema)
