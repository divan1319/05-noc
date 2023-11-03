interface ICheckService {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = ()=> void
type ErrorCallback = (error:string)=>void


export class CheckService implements ICheckService {
    
    constructor(
        private readonly successCallback:SuccessCallback,
        private readonly errorCallback:ErrorCallback
    ){

    }
    
    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if (!req.ok) throw new Error(`Error check ${url}`)

            this.successCallback()
            console.log('Service up')
            return true
        } catch (error) {
            this.errorCallback(`${error}`)
            console.log(`${error}`)
            return false
        }
    }
}