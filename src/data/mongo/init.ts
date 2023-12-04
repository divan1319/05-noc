import mongoose from "mongoose"

interface ConnectionOptionsI{
    mongoUrl:string,
    dbName:string
}

export class MongoDatabase{
    static async connect(options:ConnectionOptionsI){
        const {mongoUrl,dbName} = options

        try {
            await mongoose.connect(mongoUrl,{
                dbName:dbName,
            })

            console.log('mongo connect')
        } catch (error) {
            console.log('error mongo connect')
            throw error
        }
    }
}