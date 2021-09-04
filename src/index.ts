import { DBConnector } from "zimoykin-dynamodb-orm"
import * as dotenv from 'dotenv'
import cluster from "./utils/cluster"
 
dotenv.config()
const { REGION, AWSAccessKeyId, AWSSecretKey, REDIS_HOST, REDIS_PORT, DB_PREFIX } = process.env
export const db = DBConnector.getInstance({
    region: REGION || '',
    credentials: {
        accessKeyId: AWSAccessKeyId || '',
        secretAccessKey: AWSSecretKey || ''
    }, 
    databaseName: DB_PREFIX || 'test',
    redis: {
        host: REDIS_HOST || 'localhost',
        port: parseInt(REDIS_PORT!) || 6379
    }
  })
cluster()