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
    console.log(process.pid, 'get', `/user`)
    router.get('/user/:id', userController.findOne)
    console.log(process.pid, 'get', `/user/:id`)
    router.post('/user/signin', userController.create)
    console.log(process.pid, 'post', `/user/signin`)
    router.post('/user/login', userController.login)
    console.log(process.pid, 'post', `/user/login`)
    router.patch('/user/:id', userController.patch)
    console.log(process.pid, 'patch', `/user/:id`)
    router.delete('/user/:id', userController.delete)
    console.log(process.pid, 'delete', `/user/:id`)

    registerRoute.bind(router)
        (ActivityController.instance())
        (AdvertisingController.instance())

    router.get('/cluster', (_, res) => {
        res.send(`Cluster mode started. current PID: ${process.pid}`)
    })

    return router
}

function registerRoute<R extends ApiModel, T extends RestController<R>>(controller: T) {
    this.get(`/${controller.path}`, controller.find)
    console.log(process.pid, 'get', `/${controller.path}`)
    this.get(`/${controller.path}/:id`, controller.findOne)
    console.log(process.pid, 'get', `/${controller.path}/:id`)
    this.post(`/${controller.path}`, controller.create)
    console.log(process.pid, 'post', `/${controller.path}`)
    this.patch(`/${controller.path}/:id`, controller.patch)
    console.log(process.pid, 'patch', `/${controller.path}/:id`)
    this.delete(`/${controller.path}/:id`, controller.delete)
    console.log(process.pid, 'delete', `/${controller.path}/:id`)
    return registerRoute.bind(this)
}