import fs from 'fs'
import path from 'path'

export async function removeFile(file: string){
    const filePath = path.join(__dirname, '..', 'uploads', file)
    fs.unlink(filePath, (error)=>{
        if(error) {
            console.log(error)
            return
        }
    })
}