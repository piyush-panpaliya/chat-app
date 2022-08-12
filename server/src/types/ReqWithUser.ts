import { Request } from 'express';
import {IUser} from '../models/User';
 
interface ReqWithUser extends Request {
  user: IUser;
}
 
export default ReqWithUser;