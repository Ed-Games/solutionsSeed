import {AnyObjectSchema} from 'yup'
import {NextFunction, Request, Response} from 'express'

export const validation = (schema: AnyObjectSchema) => async(request: Request, response: Response, next: NextFunction) => {
    const body = request.body

    try {
        await schema.validate(body)
        next()
    } catch (error) {
        return response.status(400).json(error.message)
    }
}
