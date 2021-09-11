import {Request, Response} from 'express'
import { ITractor } from '../interfaces/ITractor'
import Tractor from '../schema/Tractor'
import { removeFile } from '../utils/removeFile'

class TractorController{

    public async index(request: Request, response: Response): Promise<Response>{
        try {
            const tractors = await Tractor.find()
            return response.json(tractors)
        } catch (error) {
            console.error(error)
            return response.sendStatus(500)
        }
    }

    public async create(request: Request, response: Response): Promise<Response>{
        try {
            const {name} = request.body
            const existingTractor = await Tractor.findOne({name:name})

            if(existingTractor) {
                return response.status(400).send('This name is already used, try using another name instead')
            }

            const image = request.file? request.file.filename : 'default.png'

            const createdTractor = await Tractor.create({
                name,
                image
            })

            return response.json(createdTractor).status(201)

        } catch (error) {
            console.error(error)
            return response.sendStatus(500)
        }
    }

    public async update(request: Request, response: Response): Promise<Response>{
        try {
            const {id} = request.params
            const data: ITractor = request.body

            const tractorToUpdate = await Tractor.findById(id) as unknown as ITractor

            if(!tractorToUpdate) return response.sendStatus(404)

            const tractorWithSameName = await Tractor.findOne({name:data.name}) as unknown as ITractor
            if(tractorWithSameName) return response.status(400).send('This name is already used, try using another name instead')

            const image = request.file? request.file.filename : ''

            if(image) {
                removeFile(tractorToUpdate.image)
                await Tractor.updateOne({_id: id}, {...data, image})
            } else{
                await Tractor.updateOne({id: id}, data)
            }
        
            return response.sendStatus(204)

        } catch (error) {
            return response.sendStatus(500)
        }
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        try {
            const {id} = request.params

            const tractorToDelete = await Tractor.findById(id)

            if(!tractorToDelete) return response.sendStatus(404)

            await Tractor.deleteOne({_id: id})

            return response.sendStatus(204)

        } catch (error) {
            console.error(error)
            return response.sendStatus(500)
        }
    }
}

export default new TractorController();