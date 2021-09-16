import {Request, Response} from 'express'
import { ITractor } from '../interfaces/ITractor'
import Tractor from '../schema/Tractor'
import { removeFile } from '../utils/removeFile'
import ip from 'ip'

class TractorController{

    public async index(request: Request, response: Response): Promise<Response>{
        try {
            const tractors = await Tractor.find() as unknown[] as ITractor[]

            const serializedTractors = tractors.map(tractor => {
                tractor.image = `http://${ip.address()}:${process.env.PORT}/uploads/${tractor.image}`
                return tractor
            })
            
            return response.json(serializedTractors)
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

            const image = request.file? request.file.filename : 'default.jpg'

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
            if(tractorWithSameName && tractorWithSameName._id != tractorToUpdate._id) return response.status(400).send('This name is already used, try using another name instead')

            const image = request.file? request.file.filename : ''

            if(image) {
                removeFile(tractorToUpdate.image)
                await Tractor.updateOne({_id: id}, {...data, image})
            } else{
                await Tractor.updateOne({id: id}, {name: data.name})
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

    public async detail(request: Request, response: Response): Promise<Response>{
        try {
            const {id} = request.params

            const tractor = await Tractor.findOne({_id:id}) as unknown as ITractor

            console.log(tractor)

            if(!tractor) return response.sendStatus(404)

            tractor.image = `http://${ip.address()}:${process.env.PORT}/uploads/${tractor.image}`

            return response.json(tractor).status(200)

        } catch (error) {
            console.error(error)

            return response.sendStatus(500)
        }
    }
}

export default new TractorController();