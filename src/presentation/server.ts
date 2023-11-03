import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-services"

export class Server{
    public static start(){
        console.log('Server started')
        
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(
                ()=> console.log('success'),
                (error) => console.log('error'),
            ).execute('https://google.com')
        })

        
    }
}