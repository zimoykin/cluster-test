import { Router } from "express"
import { UserController } from "./user.controller"

export default function () {
    const router = Router()
    /** user controller */
    const controller = UserController.instance()
    router.get('/user', controller.find)
    router.get('/user/:id', controller.findOne)
    router.post('/user/signin', controller.create)

    router.get('/cluster', (_, res) => {
        res.send(`Cluster mode started. current PID: ${process.pid}`)
    })

    return router

}