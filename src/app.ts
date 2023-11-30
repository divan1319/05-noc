import { envs } from "./config/plugins/env.plugin"
import { MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"


(()=>{
    main()
})()


async function main(){

    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB
    })

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
    Server.start()
    //console.log(envs.PORT)
}