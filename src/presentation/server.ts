import { CheckService } from "../domain/use-cases/checks/check-service"
import { PostgresLogDatasource } from "../infraestructure/datasources/potsgres-log.datasource"
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-services"
import { EmailService } from "./email/email-service"


const logRepository = new LogRepositoryImplementation(
    //new FileSystemDatasource()
    //new MongoLogDatasource()
    new PostgresLogDatasource()
)

const emailService = new EmailService()

export class Server{
    public static async start(){
        console.log('Server started')

        //new SendEmailLogs(emailService,fileSystemlogRepository).execute(['d.ivan_03@hotmail.com'])
        /*emailService.sendEmailWithFilesystemLogs([
            'd.ivan_1319@hotmail.com'
        ])*/

      CronService.createJob('*/5 * * * * *', () => {
          new CheckService(
            logRepository,
              ()=> console.log('success'),
              (error) => console.log('error'),
          ).execute('https://gle.c')
      })

        
    }
}