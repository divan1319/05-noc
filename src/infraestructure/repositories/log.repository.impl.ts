import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImplementation implements LogRepository{

    //private logDatasource:Lo
    constructor(
        private readonly logDatasource:LogDataSource
    ){

    }

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log)
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel)
    }
    
}