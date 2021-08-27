import * as cls from "cluster"
import * as os from "os"
import * as process from 'process'
import * as express from 'express'
import { json } from "body-parser"
import router from "../controller/shared"

const cluster = (cls as any)

export default function () {
  if (cluster.isMaster) master()
  else startWorker()
}

const subscribe = (buf: any) => {
  console.log(process.pid, JSON.parse(buf).id, JSON.parse(buf).message)
}

const startWorker = () => {
  const app = express()
  app.use('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method} ${req.url}`)
    res.setHeader('pid-answered', process.pid)
    next()
  })
  //
  app._router.get('/kill-pid', (_, res) => {
    res.send(`killed PID: ${process.pid}`)
    cluster.worker.kill()
  })
  app.use(json())
  app.use(router())
  app.listen(process.env.PORT || 8001, () => {
    console.log(`🚀 Server ${process.pid} [${cluster.worker.id}] launched on port ${process.env.PORT || 8001}!`)
    process.send(JSON.stringify({ id: process.pid, message: 'Im online!'}))
  })
}

const master = () => {
  console.log(process.pid, 'im your master')
  let cpus = os.cpus().length
  console.log(`👨‍👦‍👦 cluster started on ${os.platform()} platform and use ${cpus} cpu`)
  console.log(`free memory: ${os.freemem() / 1024 / 1024} mb`)
  for (let i = 0; i < cpus; i++) cluster.fork()
  cluster.on('exit', () => cluster.fork())
  for (const id in cluster.workers) cluster.workers[id].on('message', subscribe);
}