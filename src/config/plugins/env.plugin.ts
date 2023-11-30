import "dotenv/config"
import * as env from "env-var"


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    EMAIL: env.get('EMAIL').required().asEmailString(),
    KEY:env.get('EMAIL_KEY').required().asString(),

    //MONGODB
   /* MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASSWORD: env.get('MONGO_PASS').required().asString(),*/
}
