import { DBConnector } from "zimoykin-dynamodb-orm"
import * as dotenv from 'dotenv'
import cluster from "./utils/cluster"
 
dotenv.config()

console.log(parseInt(process.env.REDIS_PORT))
export const db = DBConnector.getInstance({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AWSSecretKey
    }, 
    databaseName: 'dblibtest',
    redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT) || 6379
    }
  })
cluster()