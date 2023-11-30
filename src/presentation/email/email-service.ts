import nodemailer from "nodemailer"
import { envs } from "../../config/plugins/env.plugin"
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


interface iSendMailOptions{
    to:string | string[];
    subject:string;
    htmlBody:string;
    attachemnts?:Attachemnt[]
}

interface Attachemnt{
    filename: string
    path: string
}

//TODO : implementar attachments

export class EmailService{

    private transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:envs.EMAIL,
            pass:envs.KEY
        }
    })

    constructor(){}

    async sendEmail(options:iSendMailOptions):Promise<boolean>{
        const { to,subject,htmlBody,attachemnts = []} = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to,subject,html:htmlBody,attachments:attachemnts
            })

            console.log(sentInformation)

            return true

        } catch (error) {
            return false
        }
    }

    sendEmailWithFilesystemLogs(to:string | string[]) : boolean{
        const subject = "Logs del servidor"
        const htmlBody = `
        <h3>LOGS DEL SISTEMA NOC<h3>
        <p>Se han enviado un par de logs par revision</p>
        <span>Ver logs adjuntos</span>
        `

        const attchments:Attachemnt[] = [
            {filename:'logs-all.log',path:'./logs/logs-all.log'},
            {filename:'logs-medium.log',path:'./logs/logs-medium.log'},
            {filename:'logs-high.log',path:'./logs/logs-high.log'},
        ]

        this.sendEmail({to,subject,attachemnts:attchments,htmlBody})
        return true
    }
}