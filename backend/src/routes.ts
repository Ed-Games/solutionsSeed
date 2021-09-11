import { Router } from "express";
import TractorController from './controllers/TractorController'
import multer from 'multer'
import uploadConfig from './config/multerconfig'

const upload = multer(uploadConfig)

const routes = Router()

routes.get('/tractors', TractorController.index)

routes.post('/create/tractor', upload.single('image') ,TractorController.create)

routes.put('/tractors/:id', upload.single('image') , TractorController.update)

routes.delete('/tractors/:id', TractorController.delete)

export {routes}