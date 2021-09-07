import { Router } from "express"
import { ApiModel } from "zimoykin-dynamodb-orm"
import { ActivityController } from "../activity.controller"
import { AdvertisingController } from "../ad.controller"
import { UserController } from "../user.controller"
import { RestController } from "./restApi.controller"
import { authorization } from '../../utils/jwt.auth'
import { cache } from "../../utils/cache"

export default function () {
    const router = Router()
    /** user controller */
    const userController = UserController.instance()
    const activity = ActivityController.instance()
    router.get('/user', userController.find)
    router.get('/user/:id', userController.findOne)
    router.post('/user/signin', userController.create)
    router.post('/user/login', userController.login)
    router.patch('/user/:id', userController.patch)
    router.delete('/user/:id', userController.delete)
    router.get('/report', authorization, activity.report)

    registerRoute.bind(router)(activity)(AdvertisingController.instance())

    router.get('/cluster', (_, res) => {
        res.send(`Cluster mode started. current PID: ${process.pid}`)
    })
    router.get('/fib/:number', (req, res) => {
        const fib = (n: number) => n <= 1 ? n : fib(n - 1) + fib(n - 2);
        if (req.params.number) {
            ( async () => {
                const start = new Date()
                const fibonacci = fib(Math.min(parseInt(req.params.number), 100))
                const result = {
                    from: Math.min(parseInt(req.params.number), 100), 
                    fibonacci: fibonacci,
                    time: (new Date().getTime()  - start.getTime()) / 1000,
                    pid: process.pid
                }
                res.status(200).json(result)
            })()
        } else res.status(400).json({error: 'number is required'})
    })

    return router
}

function registerRoute<R extends ApiModel, T extends RestController<R>>(controller: T) {
    this.get(`/${controller.path}`, 
        authorization, 
        cache,
        controller.find)
    this.get(`/${controller.path}/:id`, 
        authorization,
        cache,
        controller.findOne)
    this.post(`/${controller.path}`, 
        authorization, 
        controller.create)
    this.patch(`/${controller.path}/:id`, 
        authorization, 
        controller.patch)
    this.delete(`/${controller.path}/:id`, 
        authorization,
        controller.delete)
    return registerRoute.bind(this)
}