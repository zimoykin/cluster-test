import { Router } from "express"
import { ApiModel } from "zimoykin-dynamodb-orm"
import { ActivityController } from "../activity.controller"
import { AdvertisingController } from "../ad.controller"
import { UserController } from "../user.controller"
import { RestController } from "./restApi.controller"

export default function () {
    const router = Router()
    /** user controller */
    let userController = UserController.instance()
    router.get('/user', userController.find)
    router.get('/user/:id', userController.findOne)
    router.post('/user/signin', userController.create)
    router.post('/user/login', userController.login)
    router.patch('/user/:id', userController.patch)
    router.delete('/user/:id', userController.delete)

    registerRoute.bind(router)
        (ActivityController.instance())
        (AdvertisingController.instance())

    router.get('/cluster', (_, res) => {
        res.send(`Cluster mode started. current PID: ${process.pid}`)
    })

    return router
}

function registerRoute<R extends ApiModel,T extends RestController<R>> (controller: T) {
    this.get(`/${controller.path}`, controller.find)
    this.get(`/${controller.path}/:id`, controller.findOne)
    this.post(`/${controller.path}`, controller.create)
    this.patch(`/${controller.path}/:id`, controller.patch)
    this.delete(`/${controller.path}/:id`, controller.delete)
    return registerRoute.bind(this)
}