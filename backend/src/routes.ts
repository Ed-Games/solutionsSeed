import { Router } from "express";
import TractorController from './controllers/TractorController'
import multer from 'multer'
import uploadConfig from './config/multerconfig'
import { validation } from "./middlewares/validation";
import { createTractorSchema, updateTractorSchema } from "./yup-schemas/schemas";

const upload = multer(uploadConfig)

const routes = Router()

routes.get('/tractors', TractorController.index)

routes.post('/create/tractor', upload.single('image'), validation(createTractorSchema) ,TractorController.create)

routes.put('/tractors/:id', upload.single('image'), validation(updateTractorSchema) , TractorController.update)

routes.delete('/tractors/:id', TractorController.delete)

routes.get('/tractors/:id', TractorController.detail)

export {routes}