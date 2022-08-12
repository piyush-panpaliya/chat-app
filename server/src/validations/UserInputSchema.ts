import Joi from 'joi'

const usernameValidator = (value:any, helpers:any) => {
    if (!/^[a-zA-Z0-9._]+$/.test(value)) {
        return helpers.error('any.custom', {
            message:
                'Username must contain only letters, numbers, periods, and underscores.',
        })
    }

    return value
}

export const registerSchema = Joi.object({
    name: Joi.string().trim().required(),
    username: Joi.string()
        .required()
        .min(3)
        .max(40)
        .lowercase()
        .custom(usernameValidator)
        .invalid(
            'me',
            'username',
            'password',
            'name',
            'avatar',
            'search',
            'update',
            'delete',
            'friends',
            'focusi'
        ),
    password: Joi.string().required().min(6),
})

export const loginSchema = Joi.object({
    username: Joi.string().trim().required().lowercase(),
    password: Joi.string().required(),
})

export const updateNameSchema = Joi.object({
    name: Joi.string().trim().required(),
})

export const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required().min(6),
})

export const updateUsernameSchema = Joi.object({
    username: Joi.string()
        .trim()
        .required()
        .min(3)
        .max(40)
        .lowercase()
        .custom(usernameValidator),
})

export const todoSchema = Joi.object({
    title: Joi.string().trim().required(),
})

export const createNoteSchema = Joi.object({
    title: Joi.string().trim().required().max(100),
    content: Joi.string().trim().required(),
})

export const updateNoteSchema = Joi.object({
    title: Joi.string().trim().max(100),
    content: Joi.string().trim(),
})

export const addPomodoroSchema = Joi.object({
    name: Joi.string().trim().empty(),
    startedAt: Joi.date().required(),
    endedAt: Joi.date().required(),
})

export const addBreakSchema = Joi.object({
    startedAt: Joi.date().required(),
    endedAt: Joi.date().required(),
})
