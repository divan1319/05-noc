import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor() {
        this.createLogFiles()
    }

    private createLogFiles = () => {
        if (!existsSync(this.logPath)) {
            mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {

            if (existsSync(path)) return

            writeFileSync(path, '')
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`


        appendFileSync(this.allLogsPath, logAsJson)

        if (newLog.level === LogSeverityLevel.low) return

        if (newLog.level === LogSeverityLevel.medium) {
            appendFileSync(this.mediumLogsPath, logAsJson)
        } else {
            appendFileSync(this.highLogsPath, logAsJson)
        }
    }



    private getLogFromFile = (path: string): LogEntity[] => {
        const content = readFileSync(path,'utf-8')
        if (content === '') return []
        const logs = content.split('\n').map(
            log=>LogEntity.fromJson(log)
        )

        return logs
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogFromFile(this.allLogsPath)
            case LogSeverityLevel.medium:
                return this.getLogFromFile(this.mediumLogsPath)
            case LogSeverityLevel.high:
                return this.getLogFromFile(this.highLogsPath)
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }


}