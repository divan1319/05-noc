import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource"
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-services"


const fileSystemlogRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
)


export class Server{
    public static start(){
        console.log('Server started')
        
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(
                fileSystemlogRepository,
                ()=> console.log('success'),
                (error) => console.log('error'),
            ).execute('https://localhost:3000')
        })

        
    }
}