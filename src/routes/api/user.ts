import { Router } from 'express'
import {
    me,
    updateName,
    updatePassword,
    searchUser,
} from '../../controllers/user'
import { authGuard } from '../../middlewares/auth'
// import { upload } from '../../middlewares/upload'
import { validate } from '../../middlewares/validate'
import {
    updateNameSchema,
    updatePasswordSchema,
} from '../../validations/UserInputSchema'

const router = Router()

// Allow authenticated users only
router.use(authGuard)

router.get('/me', me)
router.put('/name', validate(updateNameSchema), updateName)
router.put('/password', validate(updatePasswordSchema), updatePassword)
router.get('/search', searchUser)

export default router
