import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface ICheckService {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = ()=> void
type ErrorCallback = (error:string)=>void


export class CheckService implements ICheckService {
    
    constructor(
        private readonly logRepository:LogRepository,
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback
    ){

    }
    
    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) throw new Error(`Error check ${url}`)

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)
            this.logRepository.saveLog(log)
            this.successCallback()

            return true
        } catch (error) {
            
            const log = new LogEntity(`${error}`, LogSeverityLevel.high)
            this.logRepository.saveLog(log)

            this.errorCallback(`${error}`)
            return false
        }
    }
}