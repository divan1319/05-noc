import { PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/env.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"


(()=>{
    main()
})()


async function main(){

    Server.start()
    /*
    const prisma = new PrismaClient()
        await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB
    })
    
    
    const newLog = await prisma.logModel.create({
        data:{
            level:'MEDIUM',
            message:'test message con psgt',
            origin:'App.ts'
        }
    })*/
    /*const logs = await prisma.logModel.findMany({
        where:{
            level:'MEDIUM'
        }*/
    //})
    //console.log(logs)
    //grabar en mongo
    /*
    const newLog = await LogModel.create({
        message:'Hola mundo con node ',
        origin:'App.ts',
        level:'low'
    })

    await newLog.save()

    console.log(newLog)
    */
    //console.log(envs.PORT)
}