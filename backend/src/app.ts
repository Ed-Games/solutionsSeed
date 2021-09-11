import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {routes} from './routes'
import path from 'path'

import dotenv from 'dotenv'

dotenv.config()

class App {
    public express: express.Application

    public constructor(){
        this.express = express()
        this.middlewares()
        this.routes()
        this.database()
    }

    private middlewares(): void {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use('/uploads',express.static(path.join(__dirname,'..','uploads')))
    }

    private database(): void {
       try {
        mongoose.connect(process.env.NODE_DATABASE_CONNECTION_STRING)
       } catch (error) {
           console.error("unable to connect to database",)
       }
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express
