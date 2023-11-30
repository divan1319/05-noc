import axios from "axios"

export class HttpClient {
    static async get(url:string){
        const res = await axios.get(url)
        return res
    }
}