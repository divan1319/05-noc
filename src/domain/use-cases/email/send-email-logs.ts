import { EmailService } from "../../../presentation/email/email-service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repositories/log.repository"

interface SendLogEmailUseCaseI {
    execute:(to:string | string[]) =>Promise<boolean>

}

export class SendEmailLogs implements SendLogEmailUseCaseI{

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ){}
    
    async execute(to: string | string[]){

        try {
            const sent = this.emailService.sendEmailWithFilesystemLogs(to)
            if(!sent){
                throw new Error('Email log not sent')
            }
            const log = new LogEntity({
                level:LogSeverityLevel.low,
                message:`email log sent `,
                origin:'use case send-email-log.ts'
                
            })
            this.logRepository.saveLog(log)
            return true
        } catch (error) {
            const log = new LogEntity({
                level:LogSeverityLevel.high,
                message:`${error}`,
                origin:'use case send-email-log.ts'
                
            })
            this.logRepository.saveLog(log)
            return false
        }
        
        

        
    }
}