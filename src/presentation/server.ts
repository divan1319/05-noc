import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource"
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-services"
import { EmailService } from "./email/email-service"


const logRepository = new LogRepositoryImplementation(
    //new FileSystemDatasource()
    new MongoLogDatasource()
)

const emailService = new EmailService()

export class Server{
    public static async start(){
        console.log('Server started')

        //new SendEmailLogs(emailService,fileSystemlogRepository).execute(['d.ivan_03@hotmail.com'])
        /*emailService.sendEmailWithFilesystemLogs([
            'd.ivan_1319@hotmail.com'
        ])*/

        const logs = await logRepository.getLog(LogSeverityLevel.high)
        console.log(logs)
      ///CronService.createJob('*/5 * * * * *', () => {
        //  new CheckService(
        //    logRepository,
        //      ()=> console.log('success'),
        //      (error) => console.log('error'),
        //  ).execute('https://google.com')
     // })

        
    }
}